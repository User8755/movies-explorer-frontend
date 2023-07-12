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
  const [currentlocation, setCurrentlocation] = useState(false);
  const [isDisabledBtnSubmit, setDisabledBtnSubmit] = useState(false);

  useEffect(() => {
    if (location === '/movies') {
      setCurrentlocation(true);
    } else {
      setCurrentlocation(false);
    }
  }, [location]);

  const handleToggleBtn = () => {
    setToggleBtn(!isToggleBtn);
    localStorage.setItem('toggle', !isToggleBtn);
  };

  const handleShortsFilms = useCallback(() => {
    const shortsFilms = [];

    JSON.parse(localStorage.getItem('movies')).map((item) => {
      if (item.duration <= 40) {
        setPreloader(true);
        shortsFilms.push(item);
        localStorage.setItem('shortsFilm', JSON.stringify(shortsFilms));
        setTimeout(() => setPreloader(false), 1000);
        return setMoviesList(JSON.parse(localStorage.getItem('shortsFilm')));
      } else {
        return setFilms(false);
      }
    });
  }, [setFilms, setMoviesList, setPreloader]);

  const handleSavedShortsFilms = useCallback(() => {
    const savedShortsFilms = [];

    JSON.parse(localStorage.getItem('savedFilms')).map((item) => {
      if (item.duration <= 40) {
        setPreloader(true);
        savedShortsFilms.push(item);
        localStorage.setItem(
          'savedShortsFilms',
          JSON.stringify(savedShortsFilms)
        );
        setTimeout(() => setPreloader(false), 1000);
        return setSavedFilms(
          JSON.parse(localStorage.getItem('savedShortsFilms'))
        );
      } else {
        return setFilms(false);
      }
    });
  }, [setFilms, setSavedFilms, setPreloader]);

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
            localStorage.setItem('movies', JSON.stringify(findFilm));
            setTimeout(() => setPreloader(false), 1000);
            return setMoviesList(JSON.parse(localStorage.getItem('movies')));
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
            localStorage.setItem('findSavedFilm', JSON.stringify(findFilm));
            return setSavedFilms(
              JSON.parse(localStorage.getItem('findSavedFilm'))
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

  const toggle = localStorage.getItem('toggle');

  useEffect(() => {
    if (location === '/movies') {
      if (localStorage.getItem('movies') && toggle === 'true') {
        handleShortsFilms();
      } else {
        setPreloader(true);
        setMoviesList(JSON.parse(localStorage.getItem('movies')));
        setTimeout(() => setPreloader(false), 1000);
      }
    }
  }, [handleShortsFilms, location, setMoviesList, setPreloader, toggle]);

  useEffect(() => {
    if (location === '/saved-movies') {
      if (localStorage.getItem('savedFilms') && toggle === 'true') {
        handleSavedShortsFilms();
      } else {
        setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
      }
    }
  }, [handleSavedShortsFilms, location, setSavedFilms, toggle]);

  return (
    <section className='search-form'>
      <form
        className='search-form__form'
        onSubmit={currentlocation ? hendleSearchFilms : hendleSearchSavedFilms}
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
          disabled={isDisabledBtnShort}
        ></input>
        <label className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
