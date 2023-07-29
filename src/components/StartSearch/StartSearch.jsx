import './StartSearch.css';

function StartSearch(props) {
  const { text } = props;
  return (
    <div className='start-search'>
      <h2 className='start-search__title'>{text}</h2>
    </div>
  );
}

export default StartSearch;
