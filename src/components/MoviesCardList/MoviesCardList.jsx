import './MoviesCardList..css';
import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
function MoviesCardList() {
  const [isMoreMovies, setsMoreMovies] = useState(false)

  const handleClickButton = () => {
    setsMoreMovies(!isMoreMovies)
  }
  
  return (
    <main className='main'>
      <section className='movies'>
        <div className='movies__list'>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
          <MoviesCard/>
        </div>
        <div className={isMoreMovies ? 'movies__list-more_true' : 'movies__list-more'}></div>
        <button className='movies__button' onClick={handleClickButton}>Еще</button>
      </section>
      
    </main>
  );
}

export default MoviesCardList;
