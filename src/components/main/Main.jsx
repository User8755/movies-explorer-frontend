import Logo from '../../images/logo.svg';
import './main.css';
function Main() {
  return (
    <main className='main'>
      <section className='lead'>
        <div className='lead__container'>
          <h1 className='lead__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className='lead__subtitle'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className='lead__button'>Узнать больше</button>
        </div>
        <img className='lead__logo' src={Logo} alt='Логотип проекта'></img>
      </section>
      <section className='project-info'>
        <h2 className='project-info__title'>О проекте</h2>
        <div className='project-info__container'>
          <h3>Дипломный проект включал 5 этапов</h3>
          <h3>На выполнение диплома ушло 5 недель</h3>
          <p className='p'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className='p'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься..</p>
        </div>
      </section>
    </main>
  );
}

export default Main;
