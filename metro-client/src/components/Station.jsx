import Block from './Block';
import './Station.css';

function Station({station, color}) {
  return (
    <section className="station">
      <Block color={color}/>
      <p>{station.stop_name}</p>
    </section>
  );
}

export default Station;