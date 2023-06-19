import './AboutProject.css';

function AboutProject(props) {
  const { isMoreInfo } = props;

  return (
    <section className={isMoreInfo ? 'aboutProject' : 'aboutProject-disable'}>
      <p className='aboutProject__name'>О проекте</p>
      <div className='aboutProject__container'>
        <div className='aboutProject__block'>
          <h3 className='aboutProject__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='aboutProject__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='aboutProject__block'>
          <h3 className='aboutProject__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='aboutProject__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься..
          </p>
        </div>
      </div>
      <div className='aboutProject__info__container_time'>
        <p className='aboutProject__paragraph_time'>1 неделя</p>
        <p className='aboutProject__paragraph_time aboutProject__paragraph_time-darck'>
          4 недель
        </p>
        <span className='aboutProject__span'>Back-end</span>
        <span className='aboutProject__span'>Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;
