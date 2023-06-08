import './Main.css';
import Promo from '../promo/Promo';
import AboutProject from '../aboutProject/AboutProject';
import Techs from '../techs/Techs';
import AboutMe from '../aboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../footer/Footer';
import Header from '../header/Header';

function Main(props) {
  const { MoreInfo, isMoreInfo } = props;

  return (
    <>
      <Header />
      <main className='main'>
        <Promo MoreInfo={MoreInfo} />
        <AboutProject isMoreInfo={isMoreInfo} />
      </main>
      <Footer />
    </>
  );
}

export default Main;
