import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav className={props.lowWidth ? 'nav-bar-disable' : 'nav-bar'}>
      <NavLink to='/movies' className='nav-bar__link'>
        Фильмы
      </NavLink>
      <NavLink to='/saved-movies' className='nav-bar__link'>
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default NavBar;
