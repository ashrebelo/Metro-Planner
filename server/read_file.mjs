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

export function getStationsOnLine(routeId) {
  if(stations.length === 0) return [];
  return stations.filter(value => String(value.route_id) === String(routeId));
}

export function getRoute(start_station_id, end_station_id) {
  if(!stations || stations.lenght === 0) {
    return [];
  }
  const start_station = stations.find(s => s.id == start_station_id);
  const end_station = stations.find(s => s.id == end_station_id);

  if(!start_station || !end_station) {
    return [];
  }

  const listOfStations = getStationsOnLine(start_station.route_id);
  if(!listOfStations || listOfStations.length === 0) {
    return [];
  }

  let startIndex, endIndex;
  if(start_station.code < end_station.code) {
    startIndex = listOfStations.findIndex(s => s.id == start_station.id);
    endIndex = listOfStations.findIndex(s => s.id == end_station.id) + 1;
  }else {
    startIndex = listOfStations.findIndex(s => s.id == end_station.id);
    endIndex = listOfStations.findIndex(s => s.id == start_station.id) + 1;
  }
  return listOfStations.slice(startIndex, endIndex);
}

//usused for testing
//REMOVE BEFORE SUBMISSION 
// async function main() {
//   await readGeoJSON();
//   const route = getRoute("38", "43");
//   console.log(route.length);
// }

// main();