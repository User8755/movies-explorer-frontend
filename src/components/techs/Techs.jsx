import './Techs.css'

function Techs(props) {

  const { isMoreInfo } = props;

  return (
    <section className={isMoreInfo ? 'techs' : 'techs-disable'}>
        <p className='techs__name'>Технологии</p>
        <h2 className='techs__title'>7 технологий</h2>
        <p className='techs__subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__list'>
          <li className='techs__div'>HTML</li>
          <li className='techs__div'>CSS</li>
          <li className='techs__div'>JS</li>
          <li className='techs__div'>React</li>
          <li className='techs__div'>Git</li>
          <li className='techs__div'>Express.js</li>
          <li className='techs__div'>mongoDB</li>
        </ul>
      </section>
  )
}

export default Techs;