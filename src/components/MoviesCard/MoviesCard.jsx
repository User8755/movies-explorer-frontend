import './MoviesCard.css';
import image from '../../images/pic__COLOR_pic.jpg';
import { useState } from 'react';

function MoviesCard() {
  const [islike, setLike] = useState(false);
  const handlelike = () => {
    setLike(!islike);
  };

  return (
    <article className='movies-cards'>
      <img src={image} alt='Обложка' className='movies-cards__image'></img>
      <div className='movies-cards__description'>
        <h2 className='movies-cards__title'>33 слова о дизайне</h2>
        <button
          type='button'
          className={
            islike
              ? 'movies-cards__button-like_active'
              : 'movies-cards__button-like'
          }
          onClick={handlelike}
        ></button>
      </div>
      <span className='movies-cards__duration'>1ч 47м</span>
    </article>
  );
}

export default MoviesCard;
