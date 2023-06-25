import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
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
