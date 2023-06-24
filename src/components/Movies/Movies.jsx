import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';

function Movies(props) {

  return (
    <>
      <Header isLogin={props.loggedIn}>
        <NavBar lowWidth={props.lowWidth}></NavBar>
        <NavButton
          lowWidth={props.lowWidth}
          modal={props.modal}
        ></NavButton>
      </Header>
      <main className='main-movies'>
        <SearchForm></SearchForm>
        <MoviesCardList
          film={props.film}
          onLike={props.onLike}
          isLike={props.isLike}
        ></MoviesCardList>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Movies;
