import './Techs.css';

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
        <li className='techs__li'>HTML</li>
        <li className='techs__li'>CSS</li>
        <li className='techs__li'>JS</li>
        <li className='techs__li'>React</li>
        <li className='techs__li'>Git</li>
        <li className='techs__li'>Express.js</li>
        <li className='techs__li'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
