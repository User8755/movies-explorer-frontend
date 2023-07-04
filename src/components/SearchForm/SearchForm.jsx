import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const { setMoviesList, SavedFilms, setSavedFilms, location } = props;
  const [isFilms, setFilms] = useState([]);
  const [isToggleBtn, setToggleBtn] = useState(false);
  const [isInput, setInput] = useState({ search: '' });
  const [errors, setErrors] = useState('');
  const [currentlocation, setCurrentlocation] = useState(false);

  useEffect(() => {
    if (location === '/movies') {
      setCurrentlocation(true);
    }
  }, [location]);

  useEffect(() => {
    films
      .getFilms()
      .then((res) => setFilms(res))
      .catch((err) => console.log(err));
  }, []);

  const handleToggleBtn = () => {
    setToggleBtn(!isToggleBtn);
    currentlocation ? handleShortsFilms() : handleSavedShortsFilms();
  };

  const handleShortsFilms = () => {
    const shortsFilms = [];
    if (!isToggleBtn) {
      JSON.parse(localStorage.getItem('movies')).map((item) => {
        if (item.duration <= 40) {
          shortsFilms.push(item);
          localStorage.setItem('shortsFilm', JSON.stringify(shortsFilms));
        }
        return setMoviesList(JSON.parse(localStorage.getItem('shortsFilm')));
      });
    } else {
      return setMoviesList(JSON.parse(localStorage.getItem('movies')));
    }
  };

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
    if (isToggleBtn) {
      localStorage.setItem('shortsFilms', true);
    } else {
      localStorage.setItem('shortsFilms', false);
    }
  }, [isToggleBtn]);

  const hendleSearchFilms = (evt) => {
    const findFilm = [];
    evt.preventDefault();
    isFilms.map((item) => {
      if (item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())) {
        findFilm.push(item);
        localStorage.setItem('movies', JSON.stringify(findFilm));
      } else {
        console.log('нет совпадений');
      }
      return setMoviesList(JSON.parse(localStorage.getItem('movies')));
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setInput({ [name]: value });
  };

  return (
    <section className='search-form'>
      <form
        className='search-form__form'
        onSubmit={hendleSearchFilms}
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
        <button className='search-form__button' type='submit'></button>
        <span className='search-form__span'>{errors}</span>
      </form>
      <div className='search-form__container'>
        <input
          type='checkbox'
          className='search-form__toggle-button'
          onClick={handleToggleBtn}
        ></input>
        <label className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
