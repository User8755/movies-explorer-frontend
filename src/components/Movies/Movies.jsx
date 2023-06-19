import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';

function Movies(props) {
  console.log(props.isLike)
  return (
    <>
      <Header isLogin={props.loggedIn}>
        <nav className='header__nav'>
          <NavLink
            to='/movies'
            className='header__nav_link header__nav_link-active'
          >
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className='header__nav_link'>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <NavLink to='/profile' className='header__button'>
          Аккаунт
        </NavLink>
      </Header>
      <main className='movies'>
        <SearchForm></SearchForm>
        <MoviesCardList film={props.film} onLike={props.onLike} isLike={props.isLike}></MoviesCardList>
        <Footer></Footer>
      </main>
    </>
  );
}

export default Movies;
