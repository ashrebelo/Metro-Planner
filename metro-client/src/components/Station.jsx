import Block from './Block';
import './Stations.css';

/**
 * Create a block that makes a box using styling and display stations name
 * @param station refers to a single station
 * @param color the color of the line the station is on
 * @returns a section with a block section and station name
 */
function Station({station, color}) {
  return (
    <section className="station">
      <Block color={color}/>
      <p>{station.stop_name}</p>
    </section>
  );
}

export default Station;