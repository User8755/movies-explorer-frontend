import './Header.css'
import profileLogo from '../../images/ProfileLogo.svg'

function Header() {
  return (
    <header className='header'>
      <img className='header__profile-logo' src={profileLogo} alt='Логотип профиля'></img>
      <nav className='header__container'>
        <useNavigate className='header__register-link'>Регистрация</useNavigate>
        <button className='header__btn-login'>Войти</button>
      </nav>
    </header>
  )
}

export default Header;