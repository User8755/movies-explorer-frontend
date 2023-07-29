import './Login.css';
import profileLogo from '../../images/ProfileLogo.svg';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';

function Login(props) {
  const {
    location,
    isValid,
    handleChange,
    errors,
    handlerLogin,
  } = props;

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
        submit={(evt) => handlerLogin(evt)}
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
            pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
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
