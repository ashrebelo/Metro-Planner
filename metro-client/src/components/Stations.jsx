import Station from './Station';
import './Stations.css';

/**
 * Loops through the routeTrip to call Station component
 * @param routeTrip list of stations from start to end
 * @param color color of the line
 * @param selectedStation refers to the station that is selected for more info
 * @returns Station component
 */
function Stations({routeTrip, color, selectedStation}) {
  return (
    <section id="stations">
      {routeTrip.map((stat, index) =>
        <Station 
          station={stat} 
          color={color} 
          key={index}
          selectClass={stat === selectedStation ? 'select' : ''} />
      )}
    </section>
  );
}

export default Stations;