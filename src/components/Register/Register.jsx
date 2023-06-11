import './Register.css';
import profileLogo from '../../images/ProfileLogo.svg';
import { NavLink } from 'react-router-dom';

function Register() {
  const hendleSubmit = (evt) => {
    evt.preventDefault();
    console.log('ты нажал кнопку');
  };

  return (
    <section className='register'>
      <img src={profileLogo} alt='логотип' className='register__logo'></img>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form'>
        <label className='register__lable'>
          Имя
          <input
            type='text'
            className='register__input'
            placeholder='Укажите Ваше имя'
            autoComplete='off'
            maxLength={30}
            minLength={2}
            required
          ></input>
        </label>
        <label className='register__lable'>
          E-mail
          <input
            type='email'
            className='register__input'
            placeholder='Укажите Вашу почту'
            autoComplete='off'
            required
          ></input>
        </label>
        <label className='register__lable'>
          Пароль
          <input
            type='password'
            className='register__input'
            placeholder='Введите пароль'
            autoComplete='off'
            minLength={4}
            maxLength={8}
            required
          ></input>
        </label>
        <button className='register__button' onClick={hendleSubmit}>
          Зарегистрироваться
        </button>
      </form>
      <nav className='register__nav'>
        <span className='register__nav_span'>Уже зарегистрированы?</span>
        <NavLink to='/sign-in' className='register__nav_link'>
          Войти
        </NavLink>
      </nav>
    </section>
  );
}

export default Register;
