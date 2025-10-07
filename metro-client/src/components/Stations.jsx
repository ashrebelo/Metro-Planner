import Station from './Station';
import './Stations.css';

function Stations({routeTrip, color}) {
  return (
    <section id="stations">
      {stations.map((stat, index) =>
        <Station station={stat} color={color} key={index} />
      )}
    </section>
  );
}

export default Stations;