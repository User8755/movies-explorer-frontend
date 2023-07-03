import './MoviesCardList..css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { film, width, moviesApiUrl, currentUser } = props;
  const [isMoreMovies, setsMoreMovies] = useState(true);
  const [countFilm, setCountFilm] = useState(0);
  const [countMoreFilm, setCountMoreFilm] = useState(0);
  const [isFilms, setFilms] = useState([]);

  const handleClickButton = () => {
    setFilms(film.slice(0, isFilms.length + countMoreFilm));
  };

  useEffect(() => {
    if (width <= 1136) {
      setCountFilm(8);
      setCountMoreFilm(2);
    }
    if (width >= 1137) {
      setCountFilm(12);
      setCountMoreFilm(3);
    }
    if (width <= 767) {
      setCountFilm(5);
      setCountMoreFilm(1);
    }
  }, [width]);

  useEffect(() => {
    setFilms(film.slice(0, countFilm));
  }, [countFilm, film]);

  useEffect(() => {
    if (film.length === isFilms.length) {
      setsMoreMovies(false);
    } else {
      setsMoreMovies(true);
    }
  }, [film.length, isFilms.length]);

  return (
    <>
      <section className='movies-card-list'>
        <div className='movies-card-list__list'>
          {isFilms.map((film) => {
            return (
              <MoviesCard
                card={film}
                key={film.id}
                moviesApiUrl={moviesApiUrl}
                currentUser={currentUser}
              ></MoviesCard>
            );
          })}
        </div>
        <button
          className={
            isMoreMovies
              ? 'movies-card-list__button'
              : 'movies-card-list__button-disabled'
          }
          onClick={handleClickButton}
        >
          Еще
        </button>
      </section>
    </>
  );
}

export default MoviesCardList;
