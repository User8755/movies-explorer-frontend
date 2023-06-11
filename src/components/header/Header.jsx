import './Header.css';
import profileLogo from '../../images/ProfileLogo.svg';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <img
        className='header__profile-logo'
        src={profileLogo}
        alt='Логотип профиля'
      ></img>
      <nav className='header__container'>
        <NavLink to='/sign-up' className='header__register-link'>
          Регистрация
        </NavLink>
        <NavLink to='/sign-in' className='header__login-link'>
          Войти
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
