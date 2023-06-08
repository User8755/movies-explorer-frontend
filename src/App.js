import './vendor/normalize.css';
import './vendor/font/Inter_Web/inter.css';
import './App.css';
import Main from './components/main/Main.jsx';
import { useState } from 'react';

function App() {
  const [isMoreInfo, setMoreInfo] = useState(false);

  const handleMoreInfo = () => {
    setMoreInfo(!isMoreInfo);
  };

  return (
    <div className='App'>
      <Main MoreInfo={handleMoreInfo} isMoreInfo={isMoreInfo}></Main>
    </div>
  );
}

export default App;
