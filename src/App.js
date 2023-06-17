import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import Profile from './components/Profile/Profile';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement.jsx';
import Register from './components/Register/Register.jsx';
import { CurrentUserContext } from './components/contexts/CurrentUserContext';
import Main from './components/main/Main.jsx';
import api from './utils/Api';
import auth from './utils/Auth';
import './vendor/font/Inter_Web/inter.css';
import './vendor/normalize.css';
import SavedMovies from './components/SavedMovies/SavedMovies.jsx';

function App() {
  const navigate = useNavigate();
  const [isMoreInfo, setMoreInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };
  const jwt = localStorage.getItem('token');

  const [isLogin, setLogin] = useState(false);


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
      <div className='App'>
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
              <ProtectedRouteElement
                loggedIn={isLogin}
                element={Profile}
                submit={handleSubmit}
                userInfo={setCurrentUser}
              />
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
              <ProtectedRouteElement
                loggedIn={isLogin}
                element={Movies}
                submit={handleSubmit}
                userInfo={setCurrentUser}
              />
            }
          ></Route>
          <Route path='/saved-movies' element={<SavedMovies />}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
