import './MoviesCardList..css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { film, width } = props;
  const [isMoreMovies, setsMoreMovies] = useState(false);
  const [countFilm,setCountFilm] = useState(0)

useEffect(()=>{
  if(width <= 320) {
    return setCountFilm(5)
  }
  if(width <=768) {
    return setCountFilm(8)
  }
  if(width >=1280) {
    return setCountFilm(12)
  }
}, [width])
console.log(countFilm)
  const handleClickButton = () => {
    setsMoreMovies(!isMoreMovies);
  };

  const sliceFilm = film.slice(0, countFilm);
  const sliceFilmLen = sliceFilm.length;

  const addMoreFilm = () => {
    if (isMoreMovies) {
      const moreFilmCard = film.slice(sliceFilmLen, sliceFilmLen + 3);
      return (
        <>
          {moreFilmCard.map((film) => {
            return <MoviesCard card={film} key={film.movieId}></MoviesCard>;
          })}
        </>
      );
    }
  };

  return (
    <>
      <section className='movies-card-list'>
        <div className='movies-card-list__list'>
          {sliceFilm.map((film) => {
            return <MoviesCard card={film} key={film.movieId}></MoviesCard>;
          })}
          {addMoreFilm()}
        </div>
        <button className='movies-card-list__button' onClick={handleClickButton}>
          Еще
        </button>
      </section>
    </>
  );
}

export default MoviesCardList;
