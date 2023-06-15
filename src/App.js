import './vendor/normalize.css';
import './vendor/font/Inter_Web/inter.css';
import './App.css';
import Main from './components/main/Main.jsx';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import Movies from './components/Movies/Movies';
import Profile from './components/Profile/Profile';
import { CurrentUserContext } from './components/contexts/CurrentUserContext';
import api from './utils/Api';
function App() {
  const [isMoreInfo, setMoreInfo] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };
  const jwt = localStorage.getItem('token');

  useEffect(() => {
    api
      .userInfoApi(jwt)
      .then((res) => setCurrentUser(res))
      .catch((error) => {
        console.log(`Код ошибки: ${error}`);
      });
  }, [jwt]);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Routes>
          <Route path='*' element={<PageNotFound />}></Route>
          <Route path='/sign-up' element={<Register></Register>}></Route>
          <Route path='/sign-in' element={<Login></Login>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route
            path='/'
            element={
              <Main MoreInfo={handleMoreInfo} isMoreInfo={isMoreInfo}></Main>
            }
          ></Route>
          <Route path='/movies' element={<Movies></Movies>}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
