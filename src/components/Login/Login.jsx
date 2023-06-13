import './Login.css';
import profileLogo from '../../images/ProfileLogo.svg';
import auth from '../../utils/Auth';
import { NavLink, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const [isLogin, setLogin] = useState(false);

  const hendleLogin = () => {
    setLogin(!isLogin);
  };

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .signin(formValue)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          hendleLogin();
          //setLogin(true);
          Navigate('/main', { replace: true });
        }
      })
      .catch((res) => console.log(res));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
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
            name='email'
            autoComplete='off'
            required
            onChange={handleChange}
          ></input>
        </label>
        <label className='login__lable'>
          Пароль
          <input
            type='password'
            className='login__input'
            placeholder='Введите пароль'
            name='password'
            autoComplete='off'
            minLength={4}
            maxLength={8}
            required
            onChange={handleChange}
          ></input>
        </label>
        <button className='login__button' onClick={hendleSubmit}>
          Войти
        </button>
      </form>
      <nav className='login__nav'>
        <span className='login__nav_span'>Ещё не зарегистрированы?</span>
        <NavLink to='/sign-up' className='login__nav_link'>
          Регистрация
        </NavLink>
      </nav>
    </section>
  );
}

export default Login;
