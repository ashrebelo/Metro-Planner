
import MapExample from './MapExample';
import Stations from './Stations';

/**
 * Determines the color of the route and passes it to Station and Map component
 * @param {routeTrip} param0 
 * @returns Stations and Map components
 */
function TripRoute({routeTrip}) {
  const colors = {
    1 : 'green', 
    2: 'orange', 
    4: 'yellow', 
    5: 'blue'
  };
  const colorIndex = routeTrip[0].route_id;
  return (
    <>
      <Stations routeTrip={routeTrip} color={colors[colorIndex]}/>
      <MapExample routeTrip={routeTrip} color={colors[colorIndex]}/>
    </>  
  );
}

export default TripRoute;