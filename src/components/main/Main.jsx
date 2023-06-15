import './Main.css';
import Promo from '../promo/Promo';
import AboutProject from '../aboutProject/AboutProject';
import Techs from '../techs/Techs';
import AboutMe from '../aboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';

function Main(props) {
  const { MoreInfo, isMoreInfo } = props;

  return (
    <>
      <Header>
      <nav className='header__container'>
        <NavLink to='/sign-up' className='header__register-link'>
          Регистрация
        </NavLink>
        <NavLink to='/sign-in' className='header__login-link'>
          Войти
        </NavLink>
      </nav>
      </Header>
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
