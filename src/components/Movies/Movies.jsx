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
  const {isFilms, isMoviesList} = props

  // useEffect(() => {
  //   if (isMoviesList === null) {
  //     setFilms(false);
  //     setDisabledBtnShort(true);
  //   } else if (isMoviesList.length > 0) {
  //     setFilms(true);
  //     setDisabledBtnShort(false);
  //   } else {
  //     setFilms(false);
  //     setDisabledBtnShort(true);
  //   }
  // }, [isMoviesList, setDisabledBtnShort]);
console.log(isFilms)
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
        handleLike={props.handleLike}
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
        setMoviesList={props.setMoviesList}
        location={props.location}
        setFilms={props.setFilms}
        setPreloader={props.setPreloader}
        isDisabledBtnShort={props.isDisabledBtnShort}
        currentUser={props.currentUser}
      ></SearchForm>
      {props.preloader ? <Preloader></Preloader> : Films}

      <Footer></Footer>
    </>
  );
}

export default Movies;
