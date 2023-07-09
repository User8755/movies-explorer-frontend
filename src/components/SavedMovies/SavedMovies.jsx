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

function SavedMovies(props) {
  const {
    location,
    setPreloader,
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
        setPreloader(true);
        localStorage.setItem('savedFilms', JSON.stringify(res));
        setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
      })
      .catch((err) => console.log(err))
      .finally(setTimeout(() => setPreloader(false), 1000));
  }, [location, setPreloader]);

  useEffect(() => {
    if (SavedFilms === undefined) {
      setFilms(false);
    }
    if (SavedFilms.length > 0) {
      setFilms(true);
    } else {
      setFilms(false);
    }
  }, [SavedFilms]);

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
        ></SearchForm>
        {isFilms ? (
          <div className='saved-movies__list'>
            {SavedFilms.map((film) => {
              return (
                <MoviesCard
                  card={film}
                  key={film.movieId}
                  currentUser={currentUser}
                  moviesApiUrl={moviesApiUrl}
                  location={location}
                ></MoviesCard>
              );
            })}
          </div>
        ) : (
          <StartSearch text={'У вас нет сохраненных фильмов'}></StartSearch>
        )}
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
