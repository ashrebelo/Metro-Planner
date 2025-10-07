import * as fs from 'node:fs/promises';
import path from 'path';

const fileName = 'stm_arrets_sig.geojson';
let stmData = [];
let stations = [];

class StationItem {
  constructor(stop_code, stop_id, stop_name, stop_url, route_id, coordinates) {
    this.code = stop_code,
    this.id = stop_id,
    this.stop_name = stop_name
    this.url = stop_url,
    this.route_id = route_id,
    this.coor = coordinates
  }
}

export async function readGeoJSON() {
  if(stmData.length === 0) {
    try {
      const filePath = path.join('./data', fileName);
      const content = await fs.readFile(filePath, 'utf8');
      const geoData = await JSON.parse(content);
      stmData =  geoData.features || geoData;
      createStationObjects()
    }catch(error) {
      console.error('Failed File Reading', error);
      stmData = [];
    }
  }
  return stmData;
}

function createStationObjects() {
  stmData.forEach((data) => {
    stations.push(new StationItem(
      data.properties.stop_code,
      data.properties.stop_id,
      data.properties.stop_name,
      data.properties.stop_url,
      data.properties.route_id,
      data.geometry.coordinates
    ))
  })
}

export function getStations() {
  if(stations.length !== 0) {
    const routeIds = ['1', '2', '4', '5'];
    return stations.filter(value => routeIds.includes(value.route_id));
  }
  return [];
}

export function getSationsOnLine(routeId) {
  if(stations.length !== 0) {
    return stations.filter(value => value.route_id === routeId);
  }
  return []
}

export function getRoute(start_station, end_station) {
  if(stations.lenght === 0) {
    return []
  }
  const listOfStations = getStationsOnLine(start_station.routeId);
  let startIndex = 0;
  let endIndex = listOfStations.length
  if(start_station.stop_code < end_station.stop_code) {
    startIndex = listOfStations.indexOf(start_station);
    endIndex = listOfStations.indexOf(end_station);
  }else {
    startIndex = listOfStations.indexOf(end_station);
    endIndex = listOfStations.indexOf(start_station);
  }
  return listOfStations.slice(startIndex, endIndex);
}

//usused for testing
//REMOVE BEFORE SUBMISSION 
// async function main() {
//   await readGeoJSON();
//   const stations = getStations();
//   console.log(stations.length);
// }

// main();