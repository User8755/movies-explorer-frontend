import Arrow from '../../images/arrow.svg';
import './Portfolio.css'

function Portfolio(props) {

  const { isMoreInfo } = props

  return (
    <section className={isMoreInfo ? 'Portfolio' : 'Portfolio-disable'}>
      <h3 className='Portfolio__title'>Портфолио</h3>
      <a href='https://github.com/User8755' className='Portfolio__link'>
        <p className='Portfolio__link_text'>Статичный сайт</p>
        <img
          src={Arrow}
          alt='стрелочка'
          className='Portfolio__link_iamge'
        ></img>
      </a>
      <a href='https://github.com/User8755' className='Portfolio__link'>
        <p className='Portfolio__link_text'>Адаптивный сайт</p>
        <img
          src={Arrow}
          alt='стрелочка'
          className='Portfolio__link_iamge'
        ></img>
      </a>
      <a href='https://github.com/User8755' className='Portfolio__link'>
        <p className='Portfolio__link_text'>Одностраничное приложение</p>
        <img
          src={Arrow}
          alt='стрелочка'
          className='Portfolio__link_iamge'
        ></img>
      </a>
    </section>
  );
}

export default Portfolio;
