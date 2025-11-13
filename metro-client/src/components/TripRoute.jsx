import { useState } from 'react';
import MapExample from './MapExample';
import Stations from './Stations';

/**
 * Determines the color of the route and passes it to Station and Map component
 * @param {routeTrip} param0 
 * @returns Stations and Map components
 */
function TripRoute({routeTrip, error}) {
  const [selectedStation, setSelectedStation] = useState('');
  const colors = {
    1 : 'green', 
    2: 'orange', 
    4: 'yellow', 
    5: 'blue'
  };
  let colorIndex;
  if(routeTrip.length > 1) {
    colorIndex = routeTrip[0].routeId;
  }
  return (
    <>
      <Stations routeTrip={routeTrip} color={colors[colorIndex]} selectedStation={selectedStation}/>
      <MapExample 
        routeTrip={routeTrip} 
        color={colors[colorIndex]} 
        setSelectedStation={setSelectedStation}/>
    </>  
  );
}

export default TripRoute;