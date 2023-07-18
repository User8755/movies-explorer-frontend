import './MoviesCard.css';
import ButtonLike from '../ButtonLike/ButtonLike';
import ButtonDelete from '../ButtonDelete/ButtonDelete';

function MoviesCard(props) {
  const { card, moviesApiUrl, location, handleLike, savedFilms, handleDeleteSavedCard } = props;
  const likeMovie = savedFilms
    ? savedFilms.find((item) => item.movieId === card.id)
    : '';

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
         <button
         type='button'
         className={
           likeMovie
             ? 'button-like-active'
             : 'button-like'
         }
         onClick={()=>handleLike(card, likeMovie)} 
       ></button>
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
