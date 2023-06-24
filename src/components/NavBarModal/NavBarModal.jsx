import { NavLink } from 'react-router-dom';
import './NavBarModal.css';
import { useEffect, useState } from 'react';
import NavButtonProfile from '../NavButtonProfile/NavButtonProfile';

function NavBarModal(props) {
  const [locationMovies, setLocationMovies] = useState(false);
  const [locationSavedMovies, setLocationSavedMovies] = useState(false);
  useEffect(() => {
    if (props.location === '/movies') {
      setLocationMovies(true);
    } else {
      setLocationMovies(false);
    }
    if (props.location === '/saved-movies') {
      setLocationSavedMovies(true);
    } else {
      setLocationSavedMovies(false);
    }
  }, [props.location]);

  const handleCLosedModal = () => props.setActive(false);

  return (
    <>
      <nav className='nav-bar-modal'>
        <NavLink
          to='/'
          className='nav-bar-modal__link'
          onClick={handleCLosedModal}
        >
          Главная
        </NavLink>
        <NavLink
          to='/movies'
          className={
            locationMovies
              ? 'nav-bar-modal__link nav-bar-modal__link-active'
              : 'nav-bar-modal__link'
          }
          onClick={handleCLosedModal}
        >
          Фильмы
        </NavLink>
        <NavLink
          to='/saved-movies'
          className={
            locationSavedMovies
              ? 'nav-bar-modal__link nav-bar-modal__link-active'
              : 'nav-bar-modal__link'
          }
          onClick={handleCLosedModal}
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <nav className='nav-bar-modal_profile'>
        <NavButtonProfile closed={handleCLosedModal}></NavButtonProfile>
      </nav>
    </>
  );
}

export default NavBarModal;
