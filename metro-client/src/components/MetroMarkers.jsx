import { Icon  } from 'leaflet';
import { 
  Marker,
  Popup,
  Polyline
} from 'react-leaflet';

import markerImage from '../assets/marker-icon.png';

const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [38, 38],
  iconAnchor: [22, 30]
});

export default function MetroMarkers({route, routeTrip, color}) {
  const points = [];
  //beware, hardcoded!!!
  return (
    <>
      {routeTrip.map((point, index) => {
        <Marker 
          position={[routeTrip[index].coordinates[1], routeTrip[index].coordinates[0]]}
          icon={customIcon}>
          <Popup>{point.stop_name}</Popup>
        </Marker>;
        points.push([routeTrip[index].coordinates[1], routeTrip[index].coordinates[0]]);
      })}
      <Polyline pathOptions={{color: color}} positions={points} />
    </>
  );
}