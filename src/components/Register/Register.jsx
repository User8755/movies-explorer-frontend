import './Register.css';
import profileLogo from '../../images/ProfileLogo.svg';
import auth from '../../utils/Auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(formValue)
      .then(() => navigate('/sign-in', { replace: true }))
      .catch((res) => console.log(res));
  };
console.log(formValue)
  return (
    <section className='register'>
      <NavLink to='/'>
        <img
          className='header__logo'
          src={profileLogo}
          alt='Логотип профиля'
        ></img>
      </NavLink>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form' method='POST' onSubmit={hendleSubmit}>
        <label className='register__lable'>
          Имя
          <input
            required
            type='text'
            className='register__input'
            placeholder='Укажите Ваше имя'
            autoComplete='off'
            minLength='2'
            maxLength={30}
            name='name'
            onChange={handleChange}
          ></input>
        </label>
        <label className='register__lable'>
          E-mail
          <input
            type='email'
            className='register__input'
            placeholder='Укажите Вашу почту'
            autoComplete='off'
            name='email'
            onChange={handleChange}
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
            name='password'
            onChange={handleChange}
            required
          ></input>
        </label>
        <button className='register__button' type='submit'>
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
