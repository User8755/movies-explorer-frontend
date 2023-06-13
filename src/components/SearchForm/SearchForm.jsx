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
      <div class='search-form__container'>
        <input type='checkbox' class='search-form__toggle-button' id='serch'></input>
        <label for='serch' className='search-form__lable'>Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
