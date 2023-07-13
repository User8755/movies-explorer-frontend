import './Preloader.css';
import { useRef } from 'react';


function Preloader() {
  const component = useRef();

  return (
    <div className='preloader' ref={component}>
      <div className='preloader__row'>
        <div className='preloader__item'></div>
        <div className='preloader__item'></div>
      </div>
    </div>
  );
}

export default Preloader