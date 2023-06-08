import Logo from '../../images/logo.svg';
import './Promo.css';


function Promo(props) {
  const {MoreInfo} = props
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className='promo__button' onClick={MoreInfo} >Узнать больше</button>
      </div>
      <img className='promo__logo' src={Logo} alt='Логотип проекта'></img>
    </section>
  );
}

export default Promo;
