import './vendor/normalize.css';
import './vendor/font/Inter_Web/inter.css';
import './App.css';
import Main from './components/main/Main.jsx';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login';

function App() {
  const [isMoreInfo, setMoreInfo] = useState(false);

  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };

  return (
    <div className='App'>
      <Routes>
        <Route path='/sign-up' element={<Register></Register>}></Route>
        <Route path='/sign-in' element={<Login></Login>}></Route>
        <Route
          path='/'
          element={
            <Main MoreInfo={handleMoreInfo} isMoreInfo={isMoreInfo}></Main>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
