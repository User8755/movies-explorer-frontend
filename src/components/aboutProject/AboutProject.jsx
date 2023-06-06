import './AboutProject.css'

function AboutProject() {
  return (
    <section className='aboutProject'>
      <p className='aboutProject__name'>О проекте</p>
      <div className='aboutProject__container'>
        <h3 className='aboutProject__title'>Дипломный проект включал 5 этапов</h3>
        <h3 className='aboutProject__title'>На выполнение диплома ушло 5 недель</h3>
        <p className='aboutProject__paragraph'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className='aboutProject__paragraph'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься..
        </p>
      </div>
      <div className='aboutProject__info__container_time'>
        <p className='aboutProject__paragraph_time'>1 неделя</p>
        <p className='aboutProject__paragraph_time aboutProject__paragraph_time-darck'>
          4 недель
        </p>
        <spna className='aboutProject__span'>Back-end</spna>
        <spna className='aboutProject__span'>Front-end</spna>
      </div>
    </section>
  );
}

export default AboutProject;
