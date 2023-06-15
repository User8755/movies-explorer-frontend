import './PageNotFound.css';
import { NavLink } from 'react-router-dom';
function PageNotFound() {
  return (
    <section className='pagenofound'>
      <h2 className='pagenofound__title'>404</h2>
      <p className='pagenofound__subtitle'>Страница не найдена</p>
      <nav className='pagenofound__nav'>
        <NavLink to='/' className='pagenofound__nav-link'>
          Назад
        </NavLink>
      </nav>
    </section>
  );
}

export default PageNotFound;
