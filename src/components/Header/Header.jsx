import './Header.css';
import profileLogo from '../../images/ProfileLogo.svg';
import { NavLink } from 'react-router-dom';

function Header(props) {
  const { children, isLogin } = props;

  const login = isLogin ? 'header header_login' : 'header';

  return (
    <header className={login}>
      <NavLink to='/'>
        <img
          className='header__logo'
          src={profileLogo}
          alt='Логотип сайта'
        ></img>
      </NavLink>
      {children}
    </header>
  );
}

export default Header;
