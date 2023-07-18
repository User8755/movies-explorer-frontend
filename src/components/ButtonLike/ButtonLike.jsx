import './ButtonLike.css'

function ButtonLike(props) {

  return (
    <button
      type='button'
      className={
        props.likeMovie
          ? 'button-like-active'
          : 'button-like'
      }
      onClick={()=>props.like(props.card, props.likeMovie)} 
    ></button>
  );
}

export default ButtonLike;
