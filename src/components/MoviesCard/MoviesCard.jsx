import './MoviesCard.css';
import { useState, useEffect } from 'react';
import api from '../../utils/Api';
import ButtonLike from '../ButtonLike/ButtonLike';
function MoviesCard(props) {
  const { card } = props;
  const [islike, setLike] = useState(false);
  const [film, setFilm] = useState(false);

  const handlelike = () => {
    if (!islike) {
      setLike(!islike);
      localStorage.setItem(card.movieId, true);
      api
        .createSaveFilm(card)
        .then((res) => {
          setFilm(res);
        })
        .catch((res) => console.log(res));
    } else {
      setLike(!islike);
      console.log(film._id);
      localStorage.removeItem(card.movieId);
      api
        .deleteSaveFilm(film._id)
        .then((res) => setFilm(res))
        .catch((res) => console.log(res));
    }
  };

  useEffect(() => {
    if (localStorage.getItem(card.movieId)) {
      setLike(true);
    }
  }, [card.movieId]);

  return (
    <article className='movies-cards'>
      <a
        href={card.trailerLink}
        target='_blank'
        rel='noreferrer'
        className='movies-cards__link'
      >
        <img
          src={card.image}
          alt={card.nameRU}
          className='movies-cards__image'
        ></img>
      </a>
      <div className='movies-cards__description'>
        <h2 className='movies-cards__title'>{card.nameRU}</h2>
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
      <span className='movies-cards__duration'>{`${Math.floor(
        card.duration / 60
      )}ч ${card.duration % 60}м`}</span>
    </article>
  );
}

export default MoviesCard;
