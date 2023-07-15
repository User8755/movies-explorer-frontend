import './MoviesCard.css';
import { useState } from 'react';
//import api from '../../utils/Api';
import ButtonLike from '../ButtonLike/ButtonLike';
import ButtonDelete from '../ButtonDelete/ButtonDelete';

function MoviesCard(props) {
  const {
    card,
    moviesApiUrl,
    location,
    handleLike

  } = props;
  const [islike, setLike] = useState(false);



  // useEffect(() => {
  //   if (location === '/movies') {
  //     setCurrentlocation(true);
  //   } 
  // }, [location]);

  // const handleDeleteSavedCard = (item) => {
  //   api
  //     .deleteSaveFilm(item._id, jwt)
  //     .then(setSavedFilms((res) => res.filter((film) => film._id !== item._id)))
  //     .catch((err) => console.log(err));
  // };

  // const handleLike = () => {
  //   if (!islike) {
  //     setLike(!islike);
  //     api
  //       .createSaveFilm(card, jwt)
  //       .then(res => 
  //         setSavedFilms([res])
  //       )
  //       .catch((res) => console.log(res));
  //   } else {
  //     setLike(!islike);
  //     handleDeleteSavedCard(film);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem(card.id) === currentUser._id) {
  //     setLike(true);
  //   }
  // }, [card.id, currentUser._id]);
console.log(location)
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
            location === '/movies'
              ? `${moviesApiUrl}/${card.image.url}`
              : `${card.image}`
          }
          alt={card.nameRU}
          className='movies-cards__image'
        ></img>
      </a>
      <div className='movies-cards__description'>
        <h2 className='movies-cards__title'>{card.nameRU}</h2>
        {location === '/movies' ? (
          <ButtonLike like={handleLike(card)} islike={islike}></ButtonLike>
        ) : (
          <ButtonDelete ></ButtonDelete>
        )}
      </div>
      <span className='movies-cards__duration'>{`${Math.floor(
        card.duration / 60
      )}ч ${card.duration % 60}м`}</span>
    </article>
  );
}

export default MoviesCard;
