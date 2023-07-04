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
  const [SavedFilms, setSavedFilms] = useState([]);
  const [isFilms, setFilms] = useState(false);

  useEffect(() => {
    if (SavedFilms.length > 0) {
      setFilms(true);
    } else {
      setFilms(false);
    }
  }, [SavedFilms]);

  useEffect(() => {
    api
      .getSaveFilm()
      .then((res) => {
        localStorage.setItem('savedFilms', JSON.stringify(res));
        setSavedFilms(JSON.parse(localStorage.getItem('savedFilms')));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <main className='saved-movies'>
        <SearchForm
          SavedFilms={SavedFilms}
          setSavedFilms={setSavedFilms}
        ></SearchForm>
        {isFilms ? (
          <div className='saved-movies__list'>
            {SavedFilms.map((film) => {
              return (
                <MoviesCard
                  card={film}
                  key={film.movieId}
                  currentUser={props.currentUser}
                  moviesApiUrl={props.moviesApiUrl}
                  location={props.location}
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
