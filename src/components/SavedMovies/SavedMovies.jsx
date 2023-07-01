import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import api from '../../utils/Api';
import MoviesCard from '../MoviesCard/MoviesCard';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import './SavedMovies.css';
function SavedMovies(props) {
  const [sevedFilm, setSvaedFilm] = useState([]);

  useEffect(() => {
    api
      .getSaveFilm()
      .then((res) => setSvaedFilm(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <main className='saved-movies'>
        <SearchForm></SearchForm>
        <div className='saved-movies__list'>
          {sevedFilm.map((film) => {
            console.log(film);
            return (
              <MoviesCard
                card={film}
                key={film.movieId}
                currentUser={props.currentUser}
              ></MoviesCard>
            );
          })}
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
