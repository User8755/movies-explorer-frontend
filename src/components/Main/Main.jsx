import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/Navbar';
import NavButton from '../NavButton/NavButton';
import { NavLink } from 'react-router-dom';

function Main(props) {
  const { MoreInfo, isMoreInfo, location, isLogin } = props;
  console.log(isLogin)
  const headerMenu = isLogin ? (
    <>
      <NavBar lowWidth={props.lowWidth}></NavBar>
      <NavButton lowWidth={props.lowWidth} modal={props.modal}></NavButton>
    </>
  ) : (
    <nav className='header__container'>
      <NavLink to='/sign-up' className='header__register-link'>
        Регистрация
      </NavLink>
      <NavLink to='/sign-in' className='header__login-link'>
        Войти
      </NavLink>
    </nav>
  );
  return (
    <>
      <Header location={location}>
        {headerMenu}
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
