import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
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
    setDisabledBtnShort,
    savedFilms,
    setSavedFilms,
    handleDeleteSavedCard,
  } = props;

  const [isFilms, setFilms] = useState(false);
  const [short, setShort] = useState([])
  const toogle = !JSON.parse(localStorage.getItem('toggleSaves')) 
  ? savedFilms
  : short
  
  useEffect(() => {
    if (savedFilms.length > 0 || short.length > 0) {
      setFilms(true);
    } else {
      setFilms(false);  
    }
  }, [savedFilms, setDisabledBtnShort,short]);
 
  const savedMovies = isFilms ? (
    <div className='saved-movies__list'>
      {toogle.map((film) => {
        console.log(film)
        return (
          <MoviesCard
            card={film}
            key={film.movieId}
            currentUser={currentUser}
            moviesApiUrl={moviesApiUrl}
            location={location}
            jwt={jwt}
            handleDeleteSavedCard={handleDeleteSavedCard}
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
          setShort={setShort}
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
