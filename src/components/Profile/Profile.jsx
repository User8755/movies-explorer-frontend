import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../../utils/Api';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  const { userInfo } = props;
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    setFormValue({name, email})
  }, [email, name]);


  const handleUpdateUser = () => {
    api
      .updateUserInfo(formValue)
      .then((res) => userInfo(res))
      .catch((res) => console.log(res));
  };

  console.log(formValue);

  const hendleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };


  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);

  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleUpdateUser();
  };

  return (
    <>
    <Header isLogin={props.loggedIn}>
        <nav className='header__nav'>
          <NavLink to='/movies' className='header__nav_link'>Фильмы</NavLink>
          <NavLink to='/saved-movies' className='header__nav_link'>Сохранённые фильмы</NavLink>
        </nav>
        <NavLink to='/profile'className='header__button'>Аккаунт</NavLink>
      </Header>
    <section className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <form type='submit' className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__lable'>
          Имя
          <input
            className='profile__input'
            type='text'
            name='name'
            placeholder='Введите имя'
            minLength={2}
            maxLength={30}
            required
            value={name || ''}
            onChange={handleChangeName}
          ></input>
        </label>
        <label className='profile__lable'>
          E-mail
          <input
            className='profile__input'
            type='email'
            name='email'
            placeholder='Введите email'
            required
            value={email || ''}
            onChange={handleChangeEmail}
          ></input>
        </label>
        <button type='submit' className='profile__button'>
          Редактировать
        </button>
      </form>
      <button className='profile__signout' onClick={hendleSignOut}>
        Выйти из аккаунта
      </button>
    </section>
    </>
  );
}

export default Profile;
