import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useCallback, useEffect, useState } from 'react';

function SearchForm(props) {
  const {
    setMoviesList,
    SavedFilms,
    setSavedFilms,
    location,
    setFilms,
    setPreloader,
  } = props;

  const [isMovies, setMovies] = useState([]);
  const [isToggleBtn, setToggleBtn] = useState(false);
  const [isInput, setInput] = useState({ search: '' });
  const [errors, setErrors] = useState('');
  const [currentlocation, setCurrentlocation] = useState(false);
  const [isDisabledBtnShort, setDisabledBtnShort] = useState(true);
  const [isDisabledBtnSubmit, setDisabledBtnSubmit] = useState(true);

  useEffect(() => {
    if (location === '/movies') {
      setCurrentlocation(true);
    } else {
      setDisabledBtnShort(false);
    }
  }, [location]);

  const handleToggleBtn = () => {
    setToggleBtn(!isToggleBtn);
    localStorage.setItem('toggle', !isToggleBtn);
  };

  // const handleShortsFilms = () => {
  //   const shortsFilms = [];
  //   if (localStorage.getItem('toggle') === true) {
  //     JSON.parse(localStorage.getItem('movies')).map((item) => {
  //       if (item.duration <= 40) {
  //         shortsFilms.push(item);
  //         localStorage.setItem('shortsFilm', JSON.stringify(shortsFilms));
  //       } else {
  //         return setFilms(false);
  //       }
  //       return setMoviesList(isShort);
  //     });
  //   } else {
  //     localStorage.removeItem('shortsFilm');
  //     return setMoviesList(JSON.parse(localStorage.getItem('movies')));
  //   }
  // };

  const handleShortsFilms = useCallback(() => {
    const shortsFilms = [];

    JSON.parse(localStorage.getItem('movies')).map((item) => {
      if (item.duration <= 40) {
        shortsFilms.push(item);
        localStorage.setItem('shortsFilm', JSON.stringify(shortsFilms));
        return setMoviesList(JSON.parse(localStorage.getItem('shortsFilm')));
      } else {
        return setFilms(false);
      }
    });
  },[setFilms, setMoviesList])

  const handleSavedShortsFilms = () => {
    const savedShortsFilms = [];
    if (!isToggleBtn) {
      SavedFilms.map((item) => {
        if (item.duration <= 40) {
          savedShortsFilms.push(item);
          localStorage.setItem(
            'savedShortsFilms',
            JSON.stringify(savedShortsFilms)
          );
        } else {
          setFilms(false);
        }
        return setSavedFilms(
          JSON.parse(localStorage.getItem('savedShortsFilms'))
        );
      });
    } else {
      return setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
    }
  };

  useEffect(() => {
    films
      .getFilms()
      .then((res) => setMovies(res), setPreloader(true))
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  }, [setPreloader]);

  const hendleSearchFilms = (evt) => {
    const findFilm = [];

    evt.preventDefault();

    isMovies.map((item) => {
      if (item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())) {
        setPreloader(true);
        findFilm.push(item);
        localStorage.setItem('movies', JSON.stringify(findFilm));
        setDisabledBtnShort(false);
        setTimeout(() => setPreloader(false), 1000);
        return setMoviesList(JSON.parse(localStorage.getItem('movies')));
      } else {
        return setTimeout(() => setPreloader(false), 1000);
      }
    });
  };

  const hendleSearchSavedFilms = (evt) => {
    const findFilm = [];
    evt.preventDefault();
    SavedFilms.map((item) => {
      if (item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())) {
        findFilm.push(item);
        localStorage.setItem('findSavedFilm', JSON.stringify(findFilm));
      } else {
        console.log('нет совпадений');
      }
      return setSavedFilms(JSON.parse(localStorage.getItem('findSavedFilm')));
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setInput({ [name]: value });
    setDisabledBtnSubmit(evt.target.validity.valid);
  };


  const toggle = localStorage.getItem('toggle')
  useEffect(() => {
    console.log(toggle === 'true')
    if (localStorage.getItem('toggle') === 'true') {
      //currentlocation ? handleShortsFilms() : handleSavedShortsFilms();
      if (localStorage.getItem('movies')) {
        
        handleShortsFilms()
      } 
    } else {
      setMoviesList(JSON.parse(localStorage.getItem('movies')))
    }
  }, [handleShortsFilms, setMoviesList, toggle]);


  return (
    <section className='search-form'>
      <form
        className='search-form__form'
        onSubmit={currentlocation ? hendleSearchFilms : hendleSearchSavedFilms}
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
