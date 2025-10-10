import Station from './Station';
import './Stations.css';

/**
 * Loops through the routeTrip to call Station component
 * @param routeTrip list of stations from start to end
 * @param color color of the line
 * @returns Station component
 */
function Stations({routeTrip, color}) {
  return (
    <section id="stations">
      {routeTrip.map((stat, index) =>
        <Station station={stat} color={color} key={index} />
      )}
    </section>
  );
}

export default Stations;