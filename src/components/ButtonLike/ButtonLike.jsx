import './ButtonLike.css'

function ButtonLike(props) {

  return (
    <button
      type='button'
      className={
        props.islike
          ? 'button-like_active'
          : 'button-like'
      }
      onClick={props.like} 
    ></button>
  );
}

export default ButtonLike;
