import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <input
          className='search-form__input'
          placeholder='Фильм'
          type='text'
          required
        ></input>
        <button className='search-form__button'></button>
      </form>
      <div className='search-form__container'>
        <input type='checkbox' className='search-form__toggle-button'></input>
        <label className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
