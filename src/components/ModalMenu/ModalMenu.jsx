import './ModalMenu.css';
import NavBarModal from '../NavBarModal/NavBarModal';

function ModalMenu(props) {
  const { active, setActive, location } = props;

  return (
    <div
      className={active ? 'modal-active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div className='modal__menu' onClick={(evt) => evt.stopPropagation()}>
        <button
          className='modal__btn-closed'
          onClick={() => setActive(false)}
        ></button>
        <NavBarModal setActive={setActive} location={location}></NavBarModal>
      </div>
    </div>
  );
}

export default ModalMenu;
