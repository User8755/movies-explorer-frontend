import './Register.css';
import profileLogo from '../../images/ProfileLogo.svg';
import auth from '../../utils/Auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from '../Form/Form';

function Register(props) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isvalid, setValid] = useState(false);
  const [errors, setErrors] = useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setFormValue({
      ...formValue,
      [name]: value,
    });
    setValid(evt.target.validity.valid);
  };

  const btnDisable = isvalid
    ? 'register__button'
    : 'register__button register__button-disabled';

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(formValue)
      .then(() => navigate('/sign-in', { replace: true }))
      .catch((err) => {
        props.error(true);
        props.message(err.message);
      });
  };

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
      <Form submit={hendleSubmit} errors={errors} >
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
        <button className={btnDisable} type='submit' disabled={!isvalid}>
          Зарегистрироваться
        </button>
      </Form>
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
