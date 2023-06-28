import { useEffect, useState } from 'react';
import './Form.css';

function Form(props) {
  const { submit, children, btnText, errors, location, isvalid } = props;
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

  const btnDisable = isvalid
    ? 'form__button'
    : 'form__button form__button-disabled';

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
        <button className={btnDisable} disabled={!isvalid}>
          {btnText}
        </button>
      ) : (
        <button
          type='submit'
          className='form__button-profile'
          disabled={!isvalid}
        >
          {btnText}
        </button>
      )}
    </form>
  );
}

export default Form;
