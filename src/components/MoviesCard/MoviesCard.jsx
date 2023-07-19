import './MoviesCard.css';
import ButtonDelete from '../ButtonDelete/ButtonDelete';

function MoviesCard(props) {
  const {
    card,
    moviesApiUrl,
    location,
    handleLike,
    savedFilms,
    handleDeleteSavedCard,
  } = props;
  const likeMovie = savedFilms
    ? savedFilms.some((item) => item.movieId === card.id)
    : '';

  const likeMovieID = savedFilms
    ? savedFilms.find((item) => item.movieId === card.id)
    : false;

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
            className={likeMovie ? 'button-like-active' : 'button-like'}
            onClick={() => handleLike(card, likeMovie, likeMovieID?._id)}
          ></button>
        ) : (
          <ButtonDelete
            del={() => handleDeleteSavedCard(card._id)}
          ></ButtonDelete>
        )}
      </div>
      <span className='movies-cards__duration'>{`${Math.floor(
        card.duration / 60
      )}ч ${card.duration % 60}м`}</span>
    </article>
  );
}

export default MoviesCard;
