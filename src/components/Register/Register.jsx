import './Register.css';
import profileLogo from '../../images/ProfileLogo.svg';
import auth from '../../utils/Auth';
import { NavLink } from 'react-router-dom';
import Form from '../Form/Form';

function Register(props) {

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(props.formValue)
      .then(()=> props.handlerLogin(evt))
      .catch((err) => {
        props.error(true);
        props.message(err.message);
        console.log(err)
      });
  };

  return (
    <section className='register'>
      <NavLink to='/'>
        <img
          className='register__logo'
          src={profileLogo}
          alt='Логотип проекта'
        ></img>
      </NavLink>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <Form
        submit={hendleSubmit}
        errors={props.errors}
        isValid={props.isValid}
        location={props.location}
        btnText={'Зарегистрироваться'}
      >
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
            onChange={props.handleChange}
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
            onChange={props.handleChange}
            pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
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
            onChange={props.handleChange}
            required
          ></input>
        </label>
      </Form>
      <nav className='register__nav'>
        <span className='register__span'>Уже зарегистрированы?</span>
        <NavLink to='/sign-in' className='register__link'>
          Войти
        </NavLink>
      </nav>
    </section>
  );
}

export default Register;
