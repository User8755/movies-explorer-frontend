import './NavButtonProfile.css';
import { NavLink } from 'react-router-dom';

function NavButtonProfile(props) {
  return (
    <NavLink
      to='/profile'
      className='nav-button-profile'
      onClick={props.closed}
    >
      Аккаунт
    </NavLink>
  );
}

export default NavButtonProfile;
