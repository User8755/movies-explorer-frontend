import { useEffect, useState, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

function App() {
  const [isMoreInfo, setMoreInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isWidth, setWidth] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessge, setErrorMessge] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [isFindFilms, setFindFilms] = useState([]);

  const location = useLocation().pathname;
  const component = useRef();

  const moviesApiUrl = 'https://api.nomoreparties.co/';

  const { width } = useResize(component);

  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };

  const jwt = localStorage.getItem('token');

  useEffect(() => {
    if (width < 770) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  }, [width]);

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

  useEffect(() => {
    auth
      .tokenValid()
      .then(() => {
        setLogin(true);
      })
      .catch((err) => console.log(err.status));
  }, []);

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
              ></Register>
            }
          ></Route>
          <Route
            path='/sign-in'
            element={
              <Login
                location={location}
                isLogin={setLogin}
                error={setError}
                message={setErrorMessge}
              ></Login>
            }
          ></Route>
          <Route
            path='/profile'
            element={
              <Profile
                loggedIn={isLogin}
                submit={handleSubmit}
                userInfo={setCurrentUser}
                lowWidth={isWidth}
                modal={setModal}
                error={setError}
                message={setErrorMessge}
              ></Profile>
              // <ProtectedRouteElement
              //   loggedIn={isLogin}
              //   element={Profile}
              //   submit={handleSubmit}
              //   userInfo={setCurrentUser}
              //   lowWidth={isWidth}
              // />
            }
          ></Route>
          <Route
            path='/'
            element={
              <Main MoreInfo={handleMoreInfo} isMoreInfo={isMoreInfo}></Main>
            }
          ></Route>
          <Route
            path='/movies'
            element={
              <Movies
                loggedIn={isLogin}
                submit={handleSubmit}
                userInfo={setCurrentUser}
                film={isFindFilms}
                lowWidth={isWidth}
                modal={setModal}
                width={width}
                setFindFilms={setFindFilms}
                moviesApiUrl={moviesApiUrl}
                currentUser={currentUser}
              ></Movies>
              // <ProtectedRouteElement
              //   loggedIn={isLogin}
              //   element={Movies}
              //   submit={handleSubmit}
              //   userInfo={setCurrentUser}
              //   film={tempFilm}
              //   lowWidth={isWidth}
              // />
            }
          ></Route>
          <Route
            path='/saved-movies'
            element={
              <SavedMovies
                loggedIn={isLogin}
                lowWidth={isWidth}
                modal={setModal}
                currentUser={currentUser}
              />
            }
          ></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
