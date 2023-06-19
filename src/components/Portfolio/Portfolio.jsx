import './Portfolio.css';

function Portfolio(props) {
  const { isMoreInfo } = props;

  return (
    <section className={isMoreInfo ? 'Portfolio' : 'Portfolio-disable'}>
      <h3 className='Portfolio__title'>Портфолио</h3>
      <a href='https://github.com/User8755' className='Portfolio__link'>
        <p className='Portfolio__link_text'>Статичный сайт</p>
        <div
          className='Portfolio__link_iamge'
        ></div>
      </a>
      <a href='https://github.com/User8755' className='Portfolio__link'>
        <p className='Portfolio__link_text'>Адаптивный сайт</p>
        <div
          className='Portfolio__link_iamge'
        ></div>
      </a>
      <a href='https://github.com/User8755' className='Portfolio__link'>
        <p className='Portfolio__link_text'>Одностраничное приложение</p>
        <div
          className='Portfolio__link_iamge'
        ></div>
      </a>
    </section>
  );
}

export default Portfolio;
