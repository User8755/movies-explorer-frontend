import './MoviesCardList..css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { isMoviesList, width, moviesApiUrl, currentUser, location } = props;
  const [isMoreMovies, setsMoreMovies] = useState(true);
  const [countFilm, setCountFilm] = useState(0);
  const [countMoreFilm, setCountMoreFilm] = useState(0);
  const [isFilmsList, setFilmsList] = useState([]);
  

  const handleClickButton = () => {
    setFilmsList(isMoviesList.slice(0, isFilmsList.length + countMoreFilm));
  };
  //JSON.parse(localStorage.getItem('movies'))
  useEffect(() => {
    setFilmsList(isMoviesList.slice(0, countFilm));
  }, [countFilm, isMoviesList]);


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
    if (isMoviesList.length === isFilmsList.length) {
      setsMoreMovies(false);
    } else {
      setsMoreMovies(true);
    }
  }, [isMoviesList.length, isFilmsList.length]);
  
  return (
    <>
      <section className='movies-card-list'>
        <div className='movies-card-list__list'>
          {isFilmsList.map((film) => {
            return (
              <MoviesCard
                card={film}
                key={film.id}
                moviesApiUrl={moviesApiUrl}
                currentUser={currentUser}
                location={location}
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
