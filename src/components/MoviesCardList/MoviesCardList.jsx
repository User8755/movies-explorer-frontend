import './MoviesCardList..css';
import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { film } = props;
  const [isMoreMovies, setsMoreMovies] = useState(false);

  const handleClickButton = () => {
    setsMoreMovies(!isMoreMovies);
  };

  const sliceFilm = film.slice(0, 12);
  const sliceFilmLen = sliceFilm.length;

  const addMoreFilm = () => {
    if (isMoreMovies) {
      const moreFilmCard = film.slice(sliceFilmLen, sliceFilmLen + 3);
      return (
        <>
          {moreFilmCard.map((card) => {
            return <MoviesCard card={card} ></MoviesCard>;
          })}
        </>
      );
    }
  };

  return (
    <>
      <section className='movies'>
        <div className='movies__list'>
          {sliceFilm.map((card) => {
            return <MoviesCard card={card}></MoviesCard>;
          })}
          {addMoreFilm()}
        </div>
        <button className='movies__button' onClick={handleClickButton}>
          Еще
        </button>
      </section>
    </>
  );
}

export default MoviesCardList;
