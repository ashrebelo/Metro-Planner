import * as fs from 'node:fs/promises';
import path from 'path';

const fileName = 'stm_arrets_sig.geojson';

let stmData = [];

export async function readGeoJSON() {
  if(stmData.length === 0) {
    try {
      const filePath = path.join('./data', fileName);
      const content = await fs.readFile(filePath, 'utf8');
      const geoData = await JSON.parse(content);
      stmData =  geoData.features || geoData;
    }catch(error) {
      console.error('Failed File Reading', error);
      stmData = [];
    }
  }
  return stmData;
}

export function getStations() {
  if(stmData.length !== 0) {
    const routeIds = ['1', '2', '4', '5'];
    return stmData.filter(value => routeIds.includes(value.properties.route_id));
  }
  return [];
}

export function getSationsOnLine(routeId) {
  if(stmData.length !== 0) {
    return stmData.filter(value => value.properties.route_id === routeId);
  }
  return []
}

export function getRoute(start_station, end_station) {
  if(stmData.lenght === 0) {
    return []
  }
  const listOfStations = getStationsOnLine(start_station.properties.routeId);
  let startIndex = 0;
  let endIndex = listOfStations.length
  if(start_station.properties.stop_code < end_station.properties.stop_code) {
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