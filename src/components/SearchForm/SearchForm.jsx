import './SearchForm.css';
import films from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const [isFilms, setFilms] = useState([]);
  const [isToggleBtn, setToggleBtn] = useState(false);
  const [isInput, setInput] = useState({ search: '' });

  useEffect(() => {
    films
      .getFilms()
      .then((res) => setFilms(res))
      .catch((err) => console.log(err));
  }, []);

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
      return props.setFindFilms(findFilm);
    });
  };

  useEffect(() => {
    const shortFilms = [];
    if (isToggleBtn) {
      props.film.map((item) => {
        if (item.duration <= 40) {
          shortFilms.push(item);
        }
        return props.setFindFilms(shortFilms);
      });
    }
  }, [isToggleBtn, props]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInput({ [name]: value });
  };

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={hendleSearchFilms}>
        <input
          className='search-form__input'
          placeholder='Фильм'
          type='text'
          name='search'
          onChange={handleChange}
          required
        ></input>
        <button className='search-form__button' type='submit'></button>
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
