import './MoviesCard.css';
import { useState, useEffect } from 'react';
import api from '../../utils/Api';
import ButtonLike from '../ButtonLike/ButtonLike';
import ButtonDelete from '../ButtonDelete/ButtonDelete';

function MoviesCard(props) {
  const { card, moviesApiUrl, currentUser, location, setSavedFilms } = props;
  const [islike, setLike] = useState(false);
  const [film, setFilm] = useState([]);
  const [currentlocation, setCurrentlocation] = useState(false);

  useEffect(() => {
    if (location === '/movies') {
      setCurrentlocation(true);
    }
  }, [location]);
  
  const handleDeleteSavedCard = (item) => {
    api
      .deleteSaveFilm(item._id)
      .then(
        setSavedFilms((res) =>res.filter((film) =>film._id !== item._id),
        localStorage.removeItem(item.movieId),
      ))
      .catch((res) => console.log(res));
  };

  const handleLike = () => {
    if (!islike) {
      setLike(!islike);
      localStorage.setItem(card.id, currentUser._id);
      api
        .createSaveFilm(card)
        .then((res) => {
          setFilm(res);
        })
        .catch((res) => console.log(res));
    } else {
      setLike(!islike);
      localStorage.removeItem(card.id);
      handleDeleteSavedCard(film);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(card.id) === currentUser._id) {
      setLike(true);
    }
  }, [card.id, currentUser._id]);

  return (
    <article className='movies-cards'>
      <a
        href={card.trailerLink}
        target='_blank'
        rel='noreferrer'
        className='movies-cards__link'
      >
        <img
          src={
            currentlocation
              ? `${moviesApiUrl}/${card.image.url}`
              : `${card.image}`
          }
          alt={card.nameRU}
          className='movies-cards__image'
        ></img>
      </a>
      <div className='movies-cards__description'>
        <h2 className='movies-cards__title'>{card.nameRU}</h2>
        {currentlocation ? (
          <ButtonLike like={handleLike} islike={islike}></ButtonLike>
        ) : (
          <ButtonDelete del={() => handleDeleteSavedCard(card)}></ButtonDelete>
        )}
      </div>
      <span className='movies-cards__duration'>{`${Math.floor(
        card.duration / 60
      )}ч ${card.duration % 60}м`}</span>
    </article>
  );
}

export default MoviesCard;
