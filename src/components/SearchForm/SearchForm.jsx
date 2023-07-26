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

  const [isToggleBtn, setToggleBtn] = useState(true);
  const [isInput, setInput] = useState('');
  const [errors, setErrors] = useState('Введите ключевое слово');
  const [isDisabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
  const [serch, setSerch] = useState([]);
  const [short, setShort] = useState([]);
  const [isDisabledBtnShort, setDisabledBtnShort] = useState(true);

  const beatfilm = localStorage.getItem('beatfilm');
  const search = localStorage.getItem('search');
  const check = document.querySelector('.search-form__toggle-button');
  const toggle = localStorage.getItem('toggle');

  const handleToggleBtn = () => {
    localStorage.setItem('toggle', check.checked);
    handleShortsFilms();
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



  // фильтркороткометражек
  const handleShortsFilms = (mov) => {
    const shortsFilms = [];

    location === '/movies'
      ? localStorage.setItem('toggle', check.checked)
      : localStorage.setItem('toggleSaves', check.checked);

    if (localStorage.getItem('toggle') === 'false' && location === '/movies') {
      setMoviesList(JSON.parse(localStorage.getItem('movies')));
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
  };

  const handleChange = (evt) => {
    setErrors(evt.target.validationMessage);
    setInput(evt.target.value);
    setDisabledBtnSubmit(
      evt.target.closest('.search-form__form').checkValidity()
    );
  };

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
   useEffect(()=>{
    location === '/movies'
      ? localStorage.setItem('toggle', false)
      : localStorage.setItem('toggleSaves', false);
   },[ location])

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
          onClick={() =>
            handleShortsFilms(JSON.parse(localStorage.getItem('movies')))
          }

        ></input>
        <label className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
