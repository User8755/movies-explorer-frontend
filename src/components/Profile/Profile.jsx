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
  const { userInfo, lowWidth, modal, error, message, jwt, setLogin } = props;
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const [isValid, setValid] = useState(true);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setErrors(evt.target.validationMessage);
    setFormValue({
      ...formValue,
      [name]: value,
    });

    setValid(evt.target.closest('.form').checkValidity());
  };

  useEffect(() => {
    if (
      formValue.name !== currentUser.name ||
      formValue.email !== currentUser.email
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [currentUser.email, currentUser.name, formValue.email, formValue.name]);

  useEffect(() => {
    setFormValue({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.email, currentUser.name, setFormValue]);

  const handleUpdateUser = () => {
    api
      .updateUserInfo(formValue, jwt)
      .then((res) => userInfo(res), error(true), message('Данные обновлены'))
      .catch((err) => {
        props.error(true);
        props.message(err.message);
        error(true);
        message('Произошла ошибка, данные не обновлены');
      });
  };

  const hendleSignOut = () => {
    localStorage.clear();
    setLogin(false)
    navigate('/', { replace: true });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser();
  };

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={lowWidth}></NavBar>
        <NavButton lowWidth={lowWidth} modal={modal}></NavButton>
      </Header>
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <Form
          submit={handleSubmit}
          btnText={'Редактировать'}
          errors={errors}
          isValid={isValid}
        >
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
              value={formValue.name || ''}
              onChange={handleChange}
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
              value={formValue.email || ''}
              onChange={handleChange}
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
