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
  if(!routeTrip || routeTrip.length === 0) {
    return (
      <div className="error-box">
        {error || 'No route found between the selected stations.'}
      </div>
    );
  }
  const firstStation = routeTrip[0];
  if(!firstStation || !firstStation.routeId) {
    return (
      <div className="error-box">
        Invaild station data returned for this route
      </div>
    );
  }

  const color = colors[firstStation.routeId] || 'gray';

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