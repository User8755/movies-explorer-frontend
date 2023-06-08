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
          <div className='techs__div'>HTML</div>
          <div className='techs__div'>CSS</div>
          <div className='techs__div'>JS</div>
          <div className='techs__div'>React</div>
          <div className='techs__div'>Git</div>
          <div className='techs__div'>Express.js</div>
          <div className='techs__div'>mongoDB</div>
        </div>
      </section>
  )
}

export default Techs;