import './MoviesCardList..css';
import { useState } from 'react';

function MoviesCardList() {
  const [isMoreMovies, setsMoreMovies] = useState(false)

  const handleClickButton = () => {
    setsMoreMovies(!isMoreMovies)
  }
  console.log(isMoreMovies)
  return (
    <main className='main'>
      <section className='movies'>
        <div className='movies__list'></div>
        <div className={isMoreMovies ? 'movies__list-more_true' : 'movies__list-more'}></div>
        <button className='movies__button' onClick={handleClickButton}>Еще</button>
      </section>
      
    </main>
  );
}

export default MoviesCardList;
