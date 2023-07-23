import { useEffect, useState, useRef, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../vendor/normalize.css';
import './App.css';
import Login from '../Login/Login.jsx';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import Profile from '../Profile/Profile';
import Register from '../Register/Register.jsx';
import { CurrentUserContext } from '../Contexts/CurrentUserContext';
import Main from '../Main/Main';
import api from '../../utils/Api';
import '../../vendor/font/Inter_Web/inter.css';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import useResize from '../../hook/useResize';
import ModalMenu from '../ModalMenu/ModalMenu';
import ModalError from '../ModalError/ModalError';
import auth from '../../utils/Auth';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement.jsx';
import Preloader from '../Preloader/Preloader';

function App() {
  const [isMoreInfo, setMoreInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isWidth, setWidth] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessge, setErrorMessge] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [isFoundFilm, setFoundFilm] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [isValid, setValid] = useState(false);
  const [errors, setErrors] = useState('');
  const [formValue, setFormValue] = useState({});
  const [isDisabledBtnShort, setDisabledBtnShort] = useState(true);
  const [islike, setLike] = useState(false);
  const [savedFilms, setSavedFilms] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const jwt = localStorage.getItem('token');
  const location = useLocation().pathname;
  const component = useRef();
  const moviesApiUrl = 'https://api.nomoreparties.co/';
  const { width } = useResize(component);

  useEffect(() => {
    if (width < 770) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  }, [width]);

  useEffect(() => {
    if (jwt) {
      auth
        .tokenValid()
        .then(() => {
          setLogin(true);
        })
        .catch((err) => console.log(err.status))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [jwt]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setFormValue({
      ...formValue,
      [name]: value,
    });

    setValid(evt.target.closest('.form').checkValidity());
  };
  const navigate = useNavigate();

  const handlerLogin = (evt) => {
    evt.preventDefault();
    auth
      .signin(formValue)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          setLogin(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setError(true);
        setErrors(err.message);
        console.log(err);
      });
  };

  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };

  useEffect(() => {
    api
      .userInfoApi(jwt)
      .then((res) => setCurrentUser(res))
      .catch((error) => {
        console.log(`Код ошибки: ${error.status}`);
      });
  }, [jwt]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const saveMovies = useCallback((item) => {
    setSavedFilms(item);
    localStorage.setItem('savedFilms', JSON.stringify(item));
  }, []);

  const getSaveFilm = useCallback(() => {
    api
      .getSaveFilm(jwt)
      .then((res) => saveMovies(res))
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  }, [jwt, saveMovies]);

  useEffect(() => {
    if (isLogin) {
      getSaveFilm();
    }
  }, [getSaveFilm, isLogin]);

  const handleDeleteSavedCard = (item) => {
    console.log(item)
    location === '/saved-movies' ? setPreloader(true) : setPreloader(false);
    api
      .deleteSaveFilm(item, jwt)
      .then(setSavedFilms((res) => res.filter((film) => film._id !== item)))
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  };

  useEffect(() => {
    isLogin &&
      localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
  }, [savedFilms, isLogin]);

  const handleLike = (card, like, cadId) => {
    if (!like) {
      setLike(true);
      api
        .createSaveFilm(card, jwt)
        .then((res) => {
          setSavedFilms([...savedFilms, res]);

        })
        .catch((res) => console.log(res));
        console.log(savedFilms)
    } else {
      setLike(false);
      handleDeleteSavedCard(cadId);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App' ref={component}>
        <ModalError
          active={error}
          setActive={setError}
          textMessage={errorMessge}
        ></ModalError>
        <ModalMenu
          active={modal}
          setActive={setModal}
          location={location}
        ></ModalMenu>
        <Routes>
          <Route path='*' element={<PageNotFound />}></Route>
          <Route
            path='/sign-up'
            element={
              <Register
                error={setError}
                message={setErrorMessge}
                location={location}
                errors={errors}
                isValid={isValid}
                formValue={formValue}
                handleChange={handleChange}
                handlerLogin={handlerLogin}
              ></Register>
            }
          ></Route>
          <Route
            path='/sign-in'
            element={
              <Login
                location={location}
                errors={errors}
                isValid={isValid}
                handleChange={handleChange}
                handlerLogin={handlerLogin}
              ></Login>
            }
          ></Route>
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={isLogin}
                submit={handleSubmit}
                userInfo={setCurrentUser}
                lowWidth={isWidth}
                modal={setModal}
                error={setError}
                message={setErrorMessge}
                jwt={jwt}
                setLogin={setLogin}
                errors={errors}
                isValid={isValid}
                formValue={formValue}
                handleChange={handleChange}
                setValid={setValid}
                setFormValue={setFormValue}
              />
            }
          ></Route>
          <Route
            path='/'
            element={
              <Main
                MoreInfo={handleMoreInfo}
                isMoreInfo={isMoreInfo}
                location={location}
                isLogin={isLogin}
                lowWidth={isWidth}
                modal={setModal}
              ></Main>
            }
          ></Route>
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={isLogin}
                submit={handleSubmit}
                userInfo={setCurrentUser}
                lowWidth={isWidth}
                modal={setModal}
                width={width}
                moviesApiUrl={moviesApiUrl}
                currentUser={currentUser}
                isFoundFilm={isFoundFilm}
                setFoundFilm={setFoundFilm}
                location={location}
                preloader={preloader}
                setPreloader={setPreloader}
                jwt={jwt}
                isDisabledBtnShort={isDisabledBtnShort}
                setDisabledBtnShort={setDisabledBtnShort}
                savedFilms={savedFilms}
                handleLike={handleLike}
                islike={islike}
              />
            }
          ></Route>
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={isLogin}
                lowWidth={isWidth}
                modal={setModal}
                currentUser={currentUser}
                isFoundFilm={isFoundFilm}
                setFoundFilm={setFoundFilm}
                moviesApiUrl={moviesApiUrl}
                location={location}
                preloader={preloader}
                setPreloader={setPreloader}
                jwt={jwt}
                isDisabledBtnShort={isDisabledBtnShort}
                setDisabledBtnShort={setDisabledBtnShort}
                savedFilms={savedFilms}
                setSavedFilms={setSavedFilms}
                getSaveFilm={getSaveFilm}
                handleDeleteSavedCard={handleDeleteSavedCard}
              />
            }
          ></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
