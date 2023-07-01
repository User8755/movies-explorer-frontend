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
  const { film } = props;
  const [isFilsm, setFilm] = useState(false);

  useEffect(() => {
    if (film.length > 0) {
      setFilm(true);
    } else {setFilm(false);}
  }, [film]);

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <SearchForm
        setFindFilms={props.setFindFilms}
        moviesApiUrl={props.moviesApiUrl}
        film={props.film}
      ></SearchForm>
      {isFilsm ? (
        <main className='main-movies'>
          <MoviesCardList
            film={props.film}
            onLike={props.onLike}
            isLike={props.isLike}
            width={props.width}
            moviesApiUrl={props.moviesApiUrl}
            currentUser={props.currentUser}
          ></MoviesCardList>
        </main>
      ) : (
        <StartSearch></StartSearch>
      )}

      <Footer></Footer>
    </>
  );
}

export default Movies;
