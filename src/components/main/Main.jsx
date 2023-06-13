import './Main.css';
import Promo from '../promo/Promo';
import AboutProject from '../aboutProject/AboutProject';
import Techs from '../techs/Techs';
import AboutMe from '../aboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
function Main(props) {
  const { MoreInfo, isMoreInfo } = props;

  return (
    <>
    <MoviesCardList></MoviesCardList>
      <Header />
      <main className='main'>
        <Promo MoreInfo={MoreInfo} isMoreInfo={isMoreInfo} />
        <AboutProject isMoreInfo={isMoreInfo} />
        <Techs isMoreInfo={isMoreInfo} />
        <AboutMe isMoreInfo={isMoreInfo} />
        <Portfolio isMoreInfo={isMoreInfo} />
      </main>
      <Footer />
    </>
  );
}

export default Main;
