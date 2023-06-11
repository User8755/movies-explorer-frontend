import './Login.css';
import profileLogo from '../../images/ProfileLogo.svg';
import { NavLink } from 'react-router-dom';

function Login() {

    const hendleSubmit = (evt) => {
      evt.preventDefault();
      console.log('ты нажал кнопку')
    };

  return (
    <section className='login'>
      <img src={profileLogo} alt='логотип' className='login__logo'></img>
      <h2 className='login__title'>Добро пожаловать!</h2>
      <form className='login__form'>
      <label className='login__lable'>
          E-mail
          <input
            type='email'
            className='login__input'
            placeholder='Укажите Вашу почту'
            autoComplete='off'
            required
          ></input>
        </label>
        <label className='login__lable'>
          Пароль
          <input
            type='password'
            className='login__input'
            placeholder='Введите пароль'
            autoComplete='off'
            minLength={4}
            maxLength={8}
            required
          ></input>
        </label>
        <button className='login__button' onClick={hendleSubmit}>
          Войти
        </button>
      </form>
      <nav className='login__nav'>
        <span className='login__nav_span'>Ещё не зарегистрированы?</span>
        <NavLink to='/sign-up' className='login__nav_link'>Регистрация</NavLink>
      </nav>
    </section>
  );
}

export default Login;