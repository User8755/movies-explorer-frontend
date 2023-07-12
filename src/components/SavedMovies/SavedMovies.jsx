import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import api from '../../utils/Api';
import MoviesCard from '../MoviesCard/MoviesCard';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import './SavedMovies.css';
import StartSearch from '../StartSearch/StartSearch';
import Preloader from '../Preloader/Preloader';
function SavedMovies(props) {
  const {
    location,
    setPreloader,
    preloader,
    loggedIn,
    lowWidth,
    modal,
    currentUser,
    moviesApiUrl,
  } = props;

  const [SavedFilms, setSavedFilms] = useState([]);
  const [isFilms, setFilms] = useState(false);

  useEffect(() => {
    api
      .getSaveFilm()
      .then((res) => {
        localStorage.setItem('savedFilms', JSON.stringify(res));
        setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
      }, setPreloader(true))
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  }, [location, setPreloader]);

  useEffect(() => {
    if (SavedFilms.length > 0 && !SavedFilms.hasOwnProperty('message')) {
      setFilms(true);
    } else {
      setFilms(false);
    }
  }, [SavedFilms]);
  const savedMovies = isFilms ? (
    <div className='saved-movies__list'>
      {SavedFilms.map((film) => {
        return (
          <MoviesCard
            card={film}
            key={film.movieId}
            currentUser={currentUser}
            moviesApiUrl={moviesApiUrl}
            location={location}
            setSavedFilms={setSavedFilms}
          ></MoviesCard>
        );
      })}
    </div>
  ) : (
    <StartSearch text={'У вас нет сохраненных фильмов'}></StartSearch>
  );
  return (
    <>
      <Header isLogin={loggedIn}>
        <NavBar lowWidth={lowWidth}></NavBar>
        <NavButton lowWidth={lowWidth} modal={modal}></NavButton>
      </Header>
      <main className='saved-movies'>
        <SearchForm
          SavedFilms={SavedFilms}
          setSavedFilms={setSavedFilms}
          setFilms={setFilms}
          location={location}
          setPreloader={setPreloader}
          isFilms={isFilms}
        ></SearchForm>
        {preloader ? <Preloader /> : savedMovies}
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
