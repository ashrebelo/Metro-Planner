import { Icon  } from 'leaflet';
import { 
  Marker,
  Popup,
  Polyline
} from 'react-leaflet';

import markerImage from '../assets/marker-icon.png';

const wikiUrl = 
  `https://en.wikipedia.org/w/api.php?action=query
  &format=json&origin=*&list=search&formatversion=2&srsearch=`;

const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [38, 38],
  iconAnchor: [22, 30]
});

export default function MetroMarkers({routeTrip, color}) {
  const points = [];
  function handleStationInfo(event) {

  }


  return (
    <>
      {routeTrip.map((point, index) => {
        const p = [routeTrip[index].coordinates[1], routeTrip[index].coordinates[0]];
        points.push(p);
        return <Marker key={index} position={p} icon={customIcon}>
          <Popup>{handleStationInfo}</Popup>
        </Marker>;
      })}
      <Polyline pathOptions={{color: color}} positions={points} />
    </>
  );
}