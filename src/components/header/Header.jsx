import './Header.css';
import profileLogo from '../../images/ProfileLogo.svg';

function Header(props) {
const {children} = props
  return (
    <header className='header'>
      <img
        className='header__profile-logo'
        src={profileLogo}
        alt='Логотип профиля'
      ></img>
      {children}
    </header>
  );
}

export default Header;
