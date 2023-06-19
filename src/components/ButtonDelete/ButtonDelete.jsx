import './ButtonDelete.css';

function ButtonDelete(props) {

  return (
    <button type='button' className='button-delete' onClick={props.del}></button>
  )
}

export default ButtonDelete;
