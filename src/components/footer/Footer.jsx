import './footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer__container'>
        <p className='footer__year'>&copy; {year}</p>
        <div className='footer__container_url'>
          <a className='footer__link' href='https://practicum.yandex.ru/'>
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            href='https://github.com/User8755/movies-explorer-frontend'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
