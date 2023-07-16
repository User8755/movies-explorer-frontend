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
    jwt,
    isDisabledBtnShort,
    setDisabledBtnShort,
  } = props;

  const [savedFilms, setSavedFilms] = useState([]);
  const [isFilms, setFilms] = useState(false);

    useEffect(() => {
    if (savedFilms.length > 0) {
      setFilms(true);
      setDisabledBtnShort(false);
    } else {
      setFilms(false);
      setDisabledBtnShort(true);
    }
  }, [savedFilms, setDisabledBtnShort]);

  useEffect(() => {
    setPreloader(true)
    api
      .getSaveFilm(jwt)
      .then((res) => setSavedFilms(res))
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  }, [jwt, setPreloader]);

  const savedMovies = isFilms ? (
    <div className='saved-movies__list'>
      {savedFilms.map((film) => {
        return (
          <MoviesCard
            card={film}
            key={film.movieId}
            currentUser={currentUser}
            moviesApiUrl={moviesApiUrl}
            location={location}
            jwt={jwt}
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
          savedFilms={savedFilms}
          setSavedFilms={setSavedFilms}
          setFilms={setFilms}
          location={location}
          setPreloader={setPreloader}
          isFilms={isFilms}
          isDisabledBtnShort={isDisabledBtnShort}
        ></SearchForm>
        {preloader ? <Preloader /> : savedMovies}
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
