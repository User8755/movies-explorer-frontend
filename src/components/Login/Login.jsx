import './Login.css';
import profileLogo from '../../images/ProfileLogo.svg';
import auth from '../../utils/Auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(props) {
  const { isLogin } = props;

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .signin(formValue)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          isLogin(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((res) => console.log(res));
  };

  return (
    <section className='login'>
      <NavLink to='/'>
        <img
          className='header__logo'
          src={profileLogo}
          alt='Логотип профиля'
        ></img>
      </NavLink>
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
