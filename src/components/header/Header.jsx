import './Header.css'
import profileLogo from '../../images/ProfileLogo.svg'
import { NavLink, useNavigate  } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  return (
    <header className='header'>
      <img className='header__profile-logo' src={profileLogo} alt='Логотип профиля'></img>
      <nav className='header__container'>
        <NavLink to="/sign-up" className='header__register-link'>Регистрация</NavLink>
        <NavLink to="/sign-in"  className='header__login-link'>Войти</NavLink>
      </nav>
    </header>
  )
}

export default Header;