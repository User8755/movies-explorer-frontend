import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useCallback, useEffect, useState } from 'react';

function SearchForm(props) {
  const {
    savedFilms,
    setSavedFilms,
    setMoviesList,
    location,
    setFilms,
    setPreloader,
    isDisabledBtnShort,
  } = props;

  const [isToggleBtn, setToggleBtn] = useState(false);
  const [isInput, setInput] = useState({ search: '' });
  const [errors, setErrors] = useState('');
  const [isDisabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
  const beatfilm = localStorage.getItem('beatfilm');

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

  const [a, b] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('beatfilm')) {
      films
        .getFilms()
        .then((res) => {
          b(res);
          localStorage.setItem('beatfilm', JSON.stringify(res));
        })
        .catch((err) => console.log(err));
    }
  }, [beatfilm]);

  useEffect(() => {
    if (location === '/movies') {
      b(JSON.parse(beatfilm));
    } else {
      b(savedFilms);
    }
  }, [beatfilm, location, savedFilms]);

  useEffect(() => {
    if (location === '/movies') {
      if (localStorage.getItem('movies')) {
        console.log(JSON.parse(localStorage.getItem('movies')));
      } else {
        setFilms(false);
      }
    }
  }, [location, setFilms, setMoviesList]);

  // поиск фильмов
  const hendleSearchFilms = (evt) => {
    evt.preventDefault();
    const findFilm = [];

    a.map((item) => {
      if (item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())) {
        setPreloader(true);
        findFilm.push(item);
        location === '/movies'
          ? localStorage.setItem('movies', JSON.stringify(findFilm))
          : localStorage.setItem('savedMovies', JSON.stringify(findFilm));
        setTimeout(() => setPreloader(false), 1000);
        return location === '/movies'
          ? setMoviesList(JSON.parse(localStorage.getItem('movies')))
          : setSavedFilms(JSON.parse(localStorage.getItem('savedMovies')));
      } else {
        return setFilms(false);
      }
    });
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

  // useEffect(() => {
  //   if (location === '/saved-movies') {
  //     if (localStorage.getItem('savedFilms') && toggle === 'true') {
  //       handleSavedShortsFilms();
  //     } else {
  //       setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
  //     }
  //   }
  // }, [handleSavedShortsFilms, location, setSavedFilms, toggle]);

  return (
    <section className='search-form'>
      <form
        className='search-form__form'
        onSubmit={hendleSearchFilms}
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
        <span className='search-form__span'>
          {'Введите ключевое слово' || errors}
        </span>
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
