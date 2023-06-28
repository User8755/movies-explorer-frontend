import NavButtonProfile from '../NavButtonProfile/NavButtonProfile';
import './NavButton.css';

function NavButton(props) {

  const width = props.lowWidth ? (
    <button
      className='button-profile-menu'
      onClick={() => props.modal(true)}
    ></button>
  ) : (
    <NavButtonProfile></NavButtonProfile>
  );

  return width;
}

export default NavButton;
