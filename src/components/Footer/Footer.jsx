import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer__container'>
        <span className='footer__year'>&copy; {year}</span>
        <div className='footer__url'>
          <a
            className='footer__link'
            href='https://practicum.yandex.ru/'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href='https://github.com/User8755/movies-explorer-frontend'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
