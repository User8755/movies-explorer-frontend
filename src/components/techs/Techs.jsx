import './Techs.css'

function Techs() {
  return (
    <section className='techs'>
        <p className='techs__name'>Технологии</p>
        <h2 className='techs__title'>7 технологий</h2>
        <p className='techs__paragraph'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className='techs__container'>
          <span className='techs__span'>HTML</span>
          <span className='techs__span'>CSS</span>
          <span className='techs__span'>JS</span>
          <span className='techs__span'>React</span>
          <span className='techs__span'>Git</span>
          <span className='techs__span'>Express.js</span>
          <span className='techs__span'>mongoDB</span>
        </div>
      </section>
  )
}

export default Techs;