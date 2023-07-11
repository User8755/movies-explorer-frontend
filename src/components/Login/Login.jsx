import './Login.css';
import profileLogo from '../../images/ProfileLogo.svg';
import auth from '../../utils/Auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from '../Form/Form';

function Login(props) {
  const { isLogin, error, message, location } = props;


  const navigate = useNavigate();

  const [errors, setErrors] = useState('');
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const [isValid, setValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setFormValue({
      ...formValue,
      [name]: value,
    });
    setValid(evt.target.closest('.form').checkValidity())
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
      .catch((err) => {
        error(true);
        message(err.message);
        console.log(err);
      });
  };

  return (
    <section className='login'>
      <NavLink to='/'>
        <img
          className='login__logo'
          src={profileLogo}
          alt='Логотип сайта'
        ></img>
      </NavLink>
      <h2 className='login__title'>Рады видеть!</h2>
      <Form
        submit={hendleSubmit}
        errors={errors}
        isValid={isValid}
        location={location}
        btnText={'Войти'}
      >
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
      </Form>
      <nav className='login__nav'>
        <span className='login__span'>Ещё не зарегистрированы?</span>
        <NavLink to='/sign-up' className='login__link'>
          Регистрация
        </NavLink>
      </nav>
    </section>
  );
}

export default Login;
