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
  } = props;

  const [isInput, setInput] = useState('');
  const [errors, setErrors] = useState('');
  const [serch, setSerch] = useState([]);

  const beatfilm = localStorage.getItem('beatfilm');
  const search = localStorage.getItem('search');
  const check = document.querySelector('.search-form__toggle-button');
  const toggle = localStorage.getItem('toggle');
  const toggleSaves = localStorage.getItem('toggleSaves');

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

  const [searchRequest, setSearchRequest] = useState({ value: '' });

  // поиск фильмов
  const hendleSearchFilms = (evt) => {
    evt.preventDefault();
    const findFilm = [];
    localStorage.setItem('search', isInput);

    serch.map((item) => {
      if (item.nameRU.toLowerCase().includes(isInput.toLowerCase())) {
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

  useEffect(() => {
    if (search && location === '/movies') {
      setInput(localStorage.getItem('search'));
      setMoviesList(JSON.parse(localStorage.getItem('movies')));
    }
  }, [location, setMoviesList, search]);

  useEffect(() => {
    if (location === '/saved-movies') {
      setSearchRequest({ value: isInput });
    }
  }, [isInput, location]);

  useEffect(() => {
    if (location === '/movies') {
      setSearchRequest({ value: isInput });
    }
  }, [isInput, location]);

  // фильтр короткометражек
  const handleShortsFilms = (mov) => {
    const shortsFilms = [];

    if (mov === null) {
      setFilms(false);
    }
    location === '/movies'
      ? localStorage.setItem('toggle', check.checked)
      : localStorage.setItem('toggleSaves', check.checked);
    if (localStorage.getItem('toggle') === 'false' && location === '/movies') {
      setMoviesList(JSON.parse(localStorage.getItem('movies')));
    } else if (
      localStorage.getItem('toggleSaves') === 'false' &&
      location === '/saved-movies'
    ) {
      setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
    } else {
      if (mov === null) {
        setFilms(false);
      } else {
        mov.map((item) => {
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
              : setSavedFilms(
                  JSON.parse(localStorage.getItem('shortsFilmSaved'))
                );
          } else {
            return setFilms(false);
          }
        });
      }
    }
  };

  const handleChange = (evt) => {
    if (evt.target.value.length === 0) {
      setErrors('Введите ключевое слово');
    } else {
      setErrors('');
    }
    console.log(evt.target.value.length);

    setInput(evt.target.value);
  };

  useEffect(() => {
    if (location === '/movies') {
      setSerch(JSON.parse(beatfilm));
    } else {
      setSerch(savedFilms);
    }
  }, [beatfilm, location, savedFilms]);

  useEffect(() => {
    if (JSON.parse(toggle) === true && location === '/movies') {
      setMoviesList(JSON.parse(localStorage.getItem('shortsFilms')));
    }
  }, [setMoviesList, toggle, location]);

  useEffect(() => {
    if (JSON.parse(toggleSaves) === true && location === '/saved-movies') {
      console.log(JSON.parse(localStorage.getItem('shortsFilmSaved')))
      setSavedFilms(JSON.parse(localStorage.getItem('shortsFilmSaved')));
    }
  }, [setSavedFilms, toggleSaves, location]);

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
          value={searchRequest.value || ''}
        ></input>
        <button className='search-form__button' type='submit'></button>
        <span className='search-form__span'>{errors}</span>
      </form>
      <div className='search-form__container'>
        <input
          type='checkbox'
          className='search-form__toggle-button'
          onClick={() =>
            handleShortsFilms(
              location === '/movies'
                ? JSON.parse(localStorage.getItem('movies'))
                : JSON.parse(localStorage.getItem('savedFilms'))
            )
          }
          defaultChecked={
            location === '/movies'
              ? JSON.parse(localStorage.getItem('toggle'))
              : JSON.parse(localStorage.getItem('toggleSaves'))
          }
        ></input>
        <label className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
