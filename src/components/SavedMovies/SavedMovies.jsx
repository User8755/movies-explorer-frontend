import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useEffect } from 'react';
import api from '../../utils/Api';
import MoviesCard from '../MoviesCard/MoviesCard';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import './SavedMovies.css';

function SavedMovies(props) {
  useEffect(() => {
    api
      .getSaveFilm()
      .then((res) => props.setFindFilms(res))
      .catch((err) => console.log(err));
  }, [props]);
console.log(props)
  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <main className='saved-movies'>
        <SearchForm
          isFoundFilm={props.isFoundFilm}
          setFoundFilm={props.setFoundFilm}
          setFindFilms={props.setFindFilms}
          film={props.isFindFilms}
        ></SearchForm>
        <div className='saved-movies__list'>
          {props.isFindFilms.map((film) => {
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
