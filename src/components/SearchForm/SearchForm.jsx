import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

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
  const [errors, setErrors] = useState('Введите ключевое слово');
  const [isDisabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
  const [serch, setSerch] = useState([]);
  const [short, setShort] = useState([]);

  const beatfilm = localStorage.getItem('beatfilm');

  const handleToggleBtn = () => {
    setToggleBtn(!isToggleBtn);
    localStorage.setItem('toggle', !isToggleBtn);
  };

  useEffect(() => {
    if (!localStorage.getItem('beatfilm')) {
      films
        .getFilms()
        .then((res) => {
          setSerch(res);
          localStorage.setItem('beatfilm', JSON.stringify(res));
        })
        .catch((err) => console.log(err));
    }
  }, [beatfilm]);

  // поиск фильмов
  const hendleSearchFilms = (evt) => {
    evt.preventDefault();
    const findFilm = [];
    localStorage.setItem('search', JSON.stringify(isInput));
    serch.map((item) => {
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

  // фильтр короткометражек
  const handleShortsFilms = () => {
    const shortsFilms = [];
    short.map((item) => {
      if (item.duration <= 40) {
        setPreloader(true);
        shortsFilms.push(item);
        location === '/movies'
          ? localStorage.setItem('shortsFilms', JSON.stringify(shortsFilms))
          : localStorage.setItem(
              'shortsFilmSaved',
              JSON.stringify(shortsFilms)
            );
        setTimeout(() => setPreloader(false), 1000);
        return location === '/movies'
          ? setMoviesList(JSON.parse(localStorage.getItem('shortsFilms')))
          : setSavedFilms(JSON.parse(localStorage.getItem('shortsFilmSaved')));
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
    //if (location === '/movies') {
    if (toggle === 'true') {
      handleShortsFilms();
    } else {
      localStorage.removeItem('shortsFilm');
      localStorage.removeItem('shortsFilmSaved');
      setPreloader(true);
      location === '/movies'
        ? setMoviesList(JSON.parse(localStorage.getItem('movies')))
        : setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
      setTimeout(() => setPreloader(false), 1000);
    }
    //}
  }, [location, setMoviesList, setPreloader, toggle]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      setShort(JSON.parse(localStorage.getItem('movies')));
    } else {
      setFilms(false);
    }
  }, [setFilms]);

  useEffect(() => {
    if (location === '/movies') {
      setSerch(JSON.parse(beatfilm));
    } else {
      setSerch(savedFilms);
      setShort(savedFilms);
    }
  }, [beatfilm, location, savedFilms]);

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
