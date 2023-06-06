import './Main.css';
import Promo from '../promo/Promo';
import AboutProject from '../aboutProject/AboutProject';
import Techs from '../techs/Techs';
import AboutMe from '../aboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../footer/Footer';

function Main() {
  return (
    <>
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
