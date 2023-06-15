import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Profile() {
  const navigate = useNavigate();

  const hendleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <form type='submit' className='profile__form'>
        <label className='profile__lable'>
          Имя
          <input
            className='profile__input'
            type='text'
            placeholder='Введите имя'
            minLength={2}
            maxLength={30}
            required={true}
            value={currentUser.name}
          ></input>
        </label>
        <label className='profile__lable'>
          E-mail
          <input
            className='profile__input'
            type='email'
            placeholder='Введите email'
            required
            value={currentUser.email}
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
  );
}

export default Profile;
