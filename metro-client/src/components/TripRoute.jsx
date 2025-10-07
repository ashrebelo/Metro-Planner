import { useState } from 'react';
import Stations from './Stations';

function TripRoute({routeTrip, color}) {
  return (
    <>
      <Stations routeTrip={routeTrip} color={color}/>
    </>  
  );
}

export default TripRoute;