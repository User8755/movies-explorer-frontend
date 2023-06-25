import SearchForm from '../SearchForm/SearchForm';
import Footer from '../_Footer/Footer';
import Header from '../_Header/Header';
import { useState, useEffect } from 'react';
import api from '../../utils/Api';
import MoviesCard from '../MoviesCard/MoviesCard';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';

function SavedMovies(props) {
  const [sevedFilm, setSvaedFilm] = useState([]);

  useEffect(() => {
    api
      .getSaveFilm()
      .then((res) => setSvaedFilm(res))
      .catch((res) => console.log(res));
  }, []);

  return (
    <>
      <Header isLogin={props.loggedIn}>
      <NavBar lowWidth={props.lowWidth}></NavBar>
       <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
      </Header>
      <main className='movies'>
        <SearchForm></SearchForm>
        <div className='movies__list'>
        {sevedFilm.map((film) => {
          return <MoviesCard card={film}></MoviesCard>;
        })}
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}

export default SavedMovies;
