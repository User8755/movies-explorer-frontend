import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../Contexts/CurrentUserContext';
import api from '../../utils/Api';
import Header from '../Header/Header';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import Form from '../Form/Form';

function Profile(props) {
  const { userInfo, lowWidth, modal } = props;
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    setValues({
      name,
      email,
    });
  }, [email, name, setValues]);

  const handleUpdateUser = () => {
    api
      .updateUserInfo(values)
      .then((res) => userInfo(res))
      .catch((err) => {
        props.error(true);
        props.message(err.message);
      });
  };

  const hendleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser();
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
    setErrors(evt.target.validationMessage);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
    setErrors(evt.target.validationMessage);
  };

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={lowWidth}></NavBar>
        <NavButton lowWidth={lowWidth} modal={modal}></NavButton>
      </Header>
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <Form submit={handleSubmit} btnText={'Редактировать'} errors={errors}>
          <label className='form__lable'>
            Имя
            <input
              className='form__input'
              type='text'
              name='name'
              placeholder='Введите имя'
              minLength={2}
              maxLength={30}
              required
              value={name || ''}
              onChange={handleChangeName}
              autoComplete='off'
            ></input>
          </label>
          <label className='form__lable'>
            E-mail
            <input
              className='form__input'
              type='email'
              name='email'
              placeholder='Введите email'
              required
              value={email || ''}
              onChange={handleChangeEmail}
            ></input>
          </label>
          
        </Form>
        <button className='profile__signout' onClick={hendleSignOut}>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
