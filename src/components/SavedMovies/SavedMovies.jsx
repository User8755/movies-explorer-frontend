import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies() {

  return (
    <>
      <Header>
        <nav className='header__nav'>
          <NavLink to='/movies' className='header__nav_link'>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='header__nav_link header__nav_link-active'
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <NavLink to='/profile' className='header__button'>
          Аккаунт
        </NavLink>
      </Header>
      <main className='movies'>
        <SearchForm></SearchForm>
        <MoviesCardList>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </MoviesCardList>
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
