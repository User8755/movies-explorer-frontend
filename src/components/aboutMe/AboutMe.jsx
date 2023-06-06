import './AboutMe.css'

function AboutMe() {
  return (
    <section className='aboutMe'>
      <p className='aboutMe__name'>Студент</p>
      <div className='aboutMe__container'>
        <div className='aboutMe__container_text'>
          <h2 className='aboutMe__title'>Евгений</h2>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__paragraph'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='https://github.com/User8755' className='aboutMe__link'>
            Github
          </a>
        </div>
        <img src='#' alt='Фото профиля' className='aboutMe__image'></img>
      </div>
    </section>
  );
}

export default AboutMe;
