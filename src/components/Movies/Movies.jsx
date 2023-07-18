import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import StartSearch from '../StartSearch/StartSearch';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

function Movies(props) {
  const [isFilms, setFilms] = useState(false);
  const [isMoviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (isMoviesList === null) {
      setFilms(false);
    } else if (isMoviesList.length > 0) {
      setFilms(true);
      props.setDisabledBtnShort(false);
    } else {
      setFilms(false);
      props.setDisabledBtnShort(true);
    }
  }, [isMoviesList, props]);

  const Films = isFilms ? (
    <main className='main-movies'>
      <MoviesCardList
        isMoviesList={isMoviesList}
        onLike={props.onLike}
        isLike={props.isLike}
        width={props.width}
        moviesApiUrl={props.moviesApiUrl}
        currentUser={props.currentUser}
        location={props.location}
        jwt={props.jwt}
        savedFilms={props.savedFilms}
        handleLike={props.handleLike}
        islike={props.islike}
      ></MoviesCardList>
    </main>
  ) : (
    <StartSearch text={'Ничего не найдено'}></StartSearch>
  );

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <SearchForm
        setMoviesList={setMoviesList}
        location={props.location}
        setFilms={setFilms}
        setPreloader={props.setPreloader}
        isDisabledBtnShort={props.isDisabledBtnShort}
      ></SearchForm>
      {props.preloader ? <Preloader></Preloader> : Films}

      <Footer></Footer>
    </>
  );
}

export default Movies;
