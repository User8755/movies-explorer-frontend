import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import StartSearch from '../StartSearch/StartSearch';
import { useEffect, useState } from 'react';

function Movies(props) {
  const [isFilms, setFilms] = useState(false);
  const [isMoviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (isMoviesList.length > 0) {
      setFilms(true);
    } else {
      setFilms(false);
    }
  }, [isMoviesList]);

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <SearchForm
        setMoviesList={setMoviesList}
        location={props.location}
      ></SearchForm>
      {isFilms ? (
        <main className='main-movies'>
          <MoviesCardList
            isMoviesList={isMoviesList}
            onLike={props.onLike}
            isLike={props.isLike}
            width={props.width}
            moviesApiUrl={props.moviesApiUrl}
            currentUser={props.currentUser}
            location={props.location}
          ></MoviesCardList>
        </main>
      ) : (
        <StartSearch text={'Ничего не найдено'}></StartSearch>
      )}

      <Footer></Footer>
    </>
  );
}

export default Movies;
