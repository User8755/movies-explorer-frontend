function ButtonLike(props) {
  const { islike, changeLike } = props;
  return (
    <button
      type='button'
      className={
        islike
          ? 'movies-cards__button-like_active'
          : 'movies-cards__button-like'
      }
      onClick={changeLike}
    ></button>
  );
}

export default ButtonLike;
