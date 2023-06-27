import './Portfolio.css';

function Portfolio(props) {
  const { isMoreInfo } = props;

  return (
    <section className={isMoreInfo ? 'portfolio' : 'portfolio-disable'}>
      <h3 className='portfolio__title'>Портфолио</h3>
      <a
        href='https://user8755.github.io/how-to-learn/'
        className='portfolio__link'
        target='_blank'
        rel='noreferrer'
      >
        <p className='portfolio__text'>Статичный сайт</p>
        <div className='portfolio__iamge'></div>
      </a>
      <a
        href='https://user8755.github.io/russian-travel/'
        className='portfolio__link'
        target='_blank'
        rel='noreferrer'
      >
        <p className='portfolio__text'>Адаптивный сайт</p>
        <div className='portfolio__iamge'></div>
      </a>
      <a
        href='https://movies.user87.nomoredomains.rocks/'
        className='portfolio__link'
        target='_blank'
        rel='noreferrer'
      >
        <p className='portfolio__text'>Одностраничное приложение</p>
        <div className='portfolio__iamge'></div>
      </a>
    </section>
  );
}

export default Portfolio;
