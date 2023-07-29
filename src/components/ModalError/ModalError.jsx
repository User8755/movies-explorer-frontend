import './ModalError.css';

function ModalError(props) {
  const { active, setActive, textMessage } = props;
  return (
    <div
      className={active ? 'modal-error-active' : 'modal-error'}
      onClick={() => setActive(false)}
    >
      <div className='modal-error__container' onClick={(evt) => evt.stopPropagation()}>
        <button
          className='modal-error__closed'
          onClick={() => setActive(false)}
        ></button>
        <p className='modal-error__description'>{textMessage}</p>
      </div>
    </div>
  );
}
export default ModalError;
