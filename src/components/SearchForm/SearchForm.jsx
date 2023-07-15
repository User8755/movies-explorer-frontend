import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useCallback, useEffect, useState } from 'react';

function SearchForm(props) {
  const {
    setMoviesList,
    setSavedFilms,
    SavedFilms,
    location,
    setFilms,
    setPreloader,
    isFilms,
    isDisabledBtnShort,
  } = props;

  const [isToggleBtn, setToggleBtn] = useState(false);
  const [isInput, setInput] = useState({ search: '' });
  const [errors, setErrors] = useState('');
  const [isDisabledBtnSubmit, setDisabledBtnSubmit] = useState(false);

  const toggle = localStorage.getItem(`toggle ${props.currentUser._id}`);
  const movies = localStorage.getItem(`movies ${props.currentUser._id}`);
  const savedMovies = localStorage.getItem(
    `savedFilms ${props.currentUser._id}`
  );

  const handleToggleBtn = () => {
    setToggleBtn(!isToggleBtn);
    localStorage.setItem(`toggle ${props.currentUser._id}`, !isToggleBtn);
  };

  

  const handleShortsFilms = useCallback(() => {
    const shortsFilms = [];

    JSON.parse(movies).map((item) => {
      if (item.duration <= 40) {
        setPreloader(true);
        shortsFilms.push(item);
        localStorage.setItem(
          `shortsFilm ${props.currentUser._id}`,
          JSON.stringify(shortsFilms)
        );
        setTimeout(() => setPreloader(false), 1000);
        return setMoviesList(
          JSON.parse(
            localStorage.getItem(`shortsFilm ${props.currentUser._id}`)
          )
        );
      } else {
        return setFilms(false);
      }
    });
  }, [movies, props.currentUser._id, setFilms, setMoviesList, setPreloader]);

  const handleSavedShortsFilms = useCallback(() => {
    const savedShortsFilms = [];

    JSON.parse(savedMovies).map((item) => {
      if (item.duration <= 40) {
        setPreloader(true);
        savedShortsFilms.push(item);
        localStorage.setItem(
          `savedShortsFilms ${props.currentUser._id}`,
          JSON.stringify(savedShortsFilms)
        );
        setTimeout(() => setPreloader(false), 1000);
        return setSavedFilms(
          JSON.parse(
            localStorage.getItem(`savedShortsFilms ${props.currentUser._id}`)
          )
        );
      } else {
        return setFilms(false);
      }
    });
  }, [
    savedMovies,
    setPreloader,
    props.currentUser._id,
    setSavedFilms,
    setFilms,
  ]);

  const hendleSearchFilms = (evt) => {
    evt.preventDefault();
    const findFilm = [];
    films
      .getFilms()
      .then((res) =>
        res.map((item) => {
          if (
            item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())
          ) {
            setPreloader(true);
            findFilm.push(item);
            localStorage.setItem(
              `movies ${props.currentUser._id}`,
              JSON.stringify(findFilm)
            );
            setTimeout(() => setPreloader(false), 1000);
            return setMoviesList(JSON.parse(movies));
          } else {
            return setFilms(false);
          }
        })
      )

      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  };

  const hendleSearchSavedFilms = (evt) => {
    const findFilm = [];

    evt.preventDefault();
    isFilms
      ? SavedFilms.map((item) => {
          if (
            item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())
          ) {
            findFilm.push(item);
            localStorage.setItem(
              `findSavedFilm ${props.currentUser._id}`,
              JSON.stringify(findFilm)
            );
            return setSavedFilms(
              JSON.parse(
                localStorage.getItem(`findSavedFilm ${props.currentUser._id}`)
              )
            );
          } else {
            return setFilms(false);
          }
        })
      : setFilms(false);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setInput({ [name]: value });
    setDisabledBtnSubmit(
      evt.target.closest('.search-form__form').checkValidity()
    );
  };

  useEffect(() => {
    if (location === '/movies') {
      if (movies && toggle === 'true') {
        handleShortsFilms();
      } else {
        setPreloader(true);
        setMoviesList(JSON.parse(movies));
        setTimeout(() => setPreloader(false), 1000);
      }
    }
  }, [
    handleShortsFilms,
    location,
    movies,
    setMoviesList,
    setPreloader,
    toggle,
  ]);

  useEffect(() => {
    if (location === '/saved-movies') {
      if (savedMovies && toggle === 'true') {
        handleSavedShortsFilms();
      } else {
        setSavedFilms(JSON.parse(savedMovies));
      }
    }
  }, [handleSavedShortsFilms, location, savedMovies, setSavedFilms, toggle]);

  return (
    <section className='search-form'>
      <form
        className='search-form__form'
        onSubmit={location === '/movies' ? hendleSearchFilms : hendleSearchSavedFilms}
        minLength={1}
        noValidate
      >
        <input
          className='search-form__input'
          placeholder='Фильм'
          type='text'
          name='search'
          onChange={handleChange}
          required
          minLength={1}
        ></input>
        <button
          className='search-form__button'
          type='submit'
          disabled={!isDisabledBtnSubmit}
        ></button>
        <span className='search-form__span'>{errors}</span>
      </form>
      <div className='search-form__container'>
        <input
          type='checkbox'
          className='search-form__toggle-button'
          onClick={handleToggleBtn}
          checked={JSON.parse(toggle) || ''}
          disabled={isDisabledBtnShort}
        ></input>
        <label className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
