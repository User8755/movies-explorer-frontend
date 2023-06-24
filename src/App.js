import { useEffect, useState, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './vendor/normalize.css';
import './App.css';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import Profile from './components/Profile/Profile';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement.jsx';
import Register from './components/Register/Register.jsx';
import { CurrentUserContext } from './components/Contexts/CurrentUserContext';
import Main from './components/Main/Main.jsx';
import api from './utils/Api';
import tempFilm from './utils/tempFilms';
import './vendor/font/Inter_Web/inter.css';
import SavedMovies from './components/SavedMovies/SavedMovies.jsx';
import useResize from './hook/useResize';
import ModalMenu from './components/ModalMenu/ModalMenu';

function App() {
  const [isMoreInfo, setMoreInfo] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isWidth, setWidth] = useState(false);
  const [modal, setModal] = useState(false);
  
  const location = useLocation().pathname;
  const component = useRef();

  const { width } = useResize(component);

  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };

  const jwt = localStorage.getItem('token');

  const [isLogin, setLogin] = useState(false);

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
        console.log(`Код ошибки: ${error}`);
      });
  }, [jwt]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App' ref={component}>
        <ModalMenu active={modal} setActive={setModal} location={location}></ModalMenu>
        <Routes>
          <Route path='*' element={<PageNotFound />}></Route>
          <Route path='/sign-up' element={<Register></Register>}></Route>
          <Route
            path='/sign-in'
            element={<Login isLogin={setLogin}></Login>}
          ></Route>
          <Route
            path='/profile'
            element={
              <Profile
                loggedIn={isLogin}
                submit={handleSubmit}
                userInfo={setCurrentUser}
                lowWidth={isWidth}
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
                film={tempFilm}
                lowWidth={isWidth}
                modal={setModal}
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
            element={<SavedMovies loggedIn={isLogin} lowWidth={isWidth} modal={setModal}/>}
          ></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
