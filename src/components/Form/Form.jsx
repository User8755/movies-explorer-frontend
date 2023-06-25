import './Form.css';

function Form(props) {
  const { submit, children, btnText, errors } = props;
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
      <button type='submit' className='form__button'>
        {btnText}
      </button>
    </form>
  );
}

export default Form;
