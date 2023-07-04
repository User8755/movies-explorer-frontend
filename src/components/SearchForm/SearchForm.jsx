import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const { film, setFindFilms, isFoundFilm, setFoundFilm } = props;
  const [isFilms, setFilms] = useState([]);
  const [isToggleBtn, setToggleBtn] = useState(false);
  const [isInput, setInput] = useState({ search: '' });
  const [errors, setErrors] = useState('');

  useEffect(() => {
    films
      .getFilms()
      .then((res) => setFilms(res))
      //.then((res) => localStorage.setItem('movies', JSON.stringify((res))))
      .catch((err) => console.log(err));
  }, []);
const movies = JSON.parse(localStorage.getItem('movies'))
  const handleToggleBtn = () => {
    setToggleBtn(!isToggleBtn);
  };
  
  const hendleSearchFilms = (evt) => {
    const findFilm = [];
    evt.preventDefault();

    isFilms.map((item) => {
      if (item.nameRU.toLowerCase().includes(isInput.search.toLowerCase())) {
        findFilm.push(item);
      } else {
        console.log('нет совпадений');
      }
      return setFindFilms(findFilm);
    });
  };

  useEffect(() => {
    if (isToggleBtn) {
      const shortFilms = [];
      setFoundFilm(film);
      film.map((item) => {
        if (item.duration <= 40) {
          shortFilms.push(item);
        }
        return setFindFilms(shortFilms);
      });
    } else {
      return setFindFilms(isFoundFilm);
    }
  }, [ isToggleBtn ]);

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
