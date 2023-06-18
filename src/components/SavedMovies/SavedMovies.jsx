import SearchForm from '../SearchForm/SearchForm';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../utils/Api';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies(props) {
  const [sevedFilm, setSvaedFilm] = useState([]);

  useEffect(() => {
    api
      .getSaveFilm()
      .then((res) => setSvaedFilm(res))
      .catch((res) => console.log(res));
  }, []);

  return (
    <>
      <Header isLogin={props.loggedIn}>
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
        <div className='movies__list'>
        {sevedFilm.map((film) => {
          return <MoviesCard card={film}></MoviesCard>;
        })}
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
