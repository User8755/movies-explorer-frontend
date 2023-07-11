import { useEffect, useState } from 'react';
import './Form.css';

function Form(props) {
  const { submit, children, btnText, errors, location, isValid, resetForm } = props;
  const [isLocation, setLocation] = useState(false);

  useEffect(() => {
    if (location === '/sign-in') {
      setLocation(true);
    }
    if (location === '/sign-up') {
      setLocation(true);
    }
    if (location === '/profile') {
      setLocation(false);
    }
  }, [location]);

  return (
    <form
      type='submit'
      name='form'
      className='form'
      onSubmit={submit}
      noValidate
    >
      {children}
      <span className='form__span'>{errors}</span>
      {isLocation ? (
        <button className='form__button' disabled={!isValid} onClick={resetForm}>
          {btnText}
        </button>
      ) : (
        <button
          type='submit'
          className='form__button-profile'
          disabled={!isValid}
        >
          {btnText}
        </button>
      )}
    </form>
  );
}

export default Form;
