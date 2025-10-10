import { Icon  } from 'leaflet';
import { useState } from 'react';
import { 
  Marker,
  Popup,
  Polyline
} from 'react-leaflet';
import './StationInfo.css';

import markerImage from '../assets/marker-icon.png';

const wikiApiUrl = 
  `https://en.wikipedia.org/w/api.php?action=query
&format=json&origin=*&list=search&formatversion=2&srsearch=`;

const wikiUrl = 'http://en.wikipedia.org/w/index.php?curid=';

const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [38, 38],
  iconAnchor: [22, 30]
});
/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function MetroMarkers({routeTrip, color}) {
  const points = [];
  const [stationInfo, setStationInfo] = useState('');
  
  async function handleStationInfo(event) {
    const selectedName = event;
    const uri = getURI(selectedName.stop_name);
    const apiUrl = wikiApiUrl + uri;
    const res = await fetch(apiUrl);
    const res1 = await res.json();
    const res2 = res1.query.search[0].snippet;
    const regex = /(<([^>]+)>)/gi;
    const info = res2.replace(regex, '');
    setStationInfo(info);
  }

  function getURI(name) {
    const justName = name.replace('Station ', '');
    const addUnderScore = justName.replaceAll(' ', '_');
    const endcode = encodeURI(addUnderScore + '_station');
    return endcode;
  }
  return (
    <>
      {routeTrip.map((point, index) => {
        const p = [routeTrip[index].coordinates[1], routeTrip[index].coordinates[0]];
        points.push(p);
        return <div key={`div-${index}`} onClick={handleStationInfo}> 
          <Marker key={index} position={p} icon={customIcon}
            eventHandlers={{click: () => handleStationInfo(routeTrip[index])}}>
            <Popup>
              <div id="station-info">
                <p id="station-info-title">{routeTrip[index].stop_name}</p>
                {stationInfo}
              </div>
            </Popup>
          </Marker>
        </div>;
      })}
      <Polyline pathOptions={{color: color}} positions={points} />
    </>
  );
}