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
 * Determines where the makers need to be and the line between
 * fetches from wiki api for info about stations
 * @param routeTrip list of the stations from start to end 
 * @param color color of the line the stations or on
 * @returns Makers and a line to be displayed on the map
 */
export default function MetroMarkers({routeTrip, color}) {
  const points = [];
  const [stationInfo, setStationInfo] = useState('');
  
  /**
   * takes the marker select, using the station fetches from the wiki api
   * also creates a link, user can use to get more info about the stations
   * using the info from the api and the created url it sets setStationInfo
   * @param event refers to the maker that was selected
   */
  async function handleStationInfo(event) {
    const selectedName = event;
    const uri = getURI(selectedName.stop_name);
    const apiUrl = wikiApiUrl + uri;
    const res = await fetch(apiUrl);
    const res1 = await res.json();
    const res2 = res1.query.search[0].snippet;
    const regex = /(<([^>]+)>)/gi;
    const info = res2.replace(regex, '');
    const url = wikiUrl + res1.query.search[0].pageid;
    setStationInfo([info, url]);
  }

  /**
   * moves the word station to the end of the string
   * replaces of the spaces with '_'
   * encodeds the string
   * @param name of the station
   * @returns an encode station name
   */
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
                {stationInfo[0]}
                <a href={stationInfo[1]}>more info</a>
              </div>
            </Popup>
          </Marker>
        </div>;
      })}
      <Polyline pathOptions={{color: color}} positions={points} />
    </>
  );
}