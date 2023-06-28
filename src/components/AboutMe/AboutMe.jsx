import './AboutMe.css';
import Foto from '../../images/Me.jpg';

function AboutMe(props) {
  const { isMoreInfo } = props;

  return (
    <section className={isMoreInfo ? 'aboutMe' : 'aboutMe-disable'}>
      <p className='aboutMe__name'>Студент</p>
      <div className='aboutMe__container'>
        <div className='aboutMe__description'>
          <h2 className='aboutMe__title'>Евгений</h2>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 33 года</p>
          <p className='aboutMe__paragraph'>
            Живу в городе Челябинск, работаю кладовщиком на скаладе. Мечтаю о
            смне рода деятельности, одна из причин поступления на крусы Яндекс
            Практикум.
          </p>
          <a
            href='https://github.com/User8755'
            className='aboutMe__link'
            target='_blank' rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={Foto} alt='Фото профиля' className='aboutMe__image'></img>
      </div>
    </section>
  );
}

export default AboutMe;
