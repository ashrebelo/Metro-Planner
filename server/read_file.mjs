import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const fileName = 'stm_arrets_sig.geojson';
const _filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(_filename);
let stmData = [];
const stations = [];
/**
 * StationItem class
 * create a station with only nessarcy information
 */
class StationItem {
  constructor(stopCode, stopId, stopName, stopUrl, routeId, coordinates) {
    this.code = stopCode,
    this.id = stopId,
    this.stopName = stopName,
    this.url = stopUrl,
    this.routeId = routeId,
    this.coordinates = coordinates;
  }
}

/**
 * read the file using file name at the top
 * call createStationObjects to create the station objects
 * @returns 
 */
export async function readGeoJSON() {
  if(stmData.length === 0) {
    try {
      const filePath = path.join(dirname, 'data', fileName);
      const content = await fs.readFile(filePath, 'utf8');
      const geoData = await JSON.parse(content);
      stmData =  geoData.features || geoData;
      createStationObjects();
    }catch(error) {
      console.error('Failed File Reading', error);
      stmData = [];
    }
  }
  return stmData;
}

/**
 * using stmData create StationItem objects and pushes them to stations
 */
function createStationObjects() {
  stmData.forEach((data) => {
    stations.push(new StationItem(
      data.properties.stop_code,
      data.properties.stop_id,
      data.properties.stop_name,
      data.properties.stop_url,
      data.properties.route_id,
      data.geometry.coordinates
    ));
  });
}

/**
 * filter everything except metro station and returns filtered list
 * @returns filtered list of only metro stations
 */
export function getStations() {
  if(stations.length !== 0) {
    const routeIds = ['1', '2', '4', '5'];
    return stations.filter(value => routeIds.includes(value.routeId)).map(s => s.stopName);
  }
  return [];
}

/**
 * usilng the routeId it filter stations for stations on the same line
 * @param routeId refers to a metro line
 * @returns filter list of all station with routeId
 */
export function getStationsOnLine(routeId) {
  if(stations.length === 0) return [];
  return stations.filter(value => String(value.routeId) === String(routeId)).map(s => s.stopName);
}

/**
 * using the start and end station id it slices a list of the station on the route
 * @param startStationId refers to the station id of the start station
 * @param endStationId refers to the station id of the end station
 * @returns a list of the trip
 */
export function getRoute(startStationId, endStationId) {
  if(!stations || stations.length === 0) {
    return [];
  }
  const startStation = stations.find(s => s.id === startStationId);
  const endStation = stations.find(s => s.id === endStationId);
  if(!startStation || !endStation) {
    return [];
  }
  const listOfStations = getStationsOnLine(startStation.routeId);
  if(!listOfStations || listOfStations.length === 0) {
    return [];
  }
  const startIndex = listOfStations.findIndex(s => s.id === startStation.id);
  const endIndex = listOfStations.findIndex(s => s.id === endStation.id);
  let route;
  if(startIndex < endIndex) {
    route = listOfStations.slice(startIndex, endIndex + 1);
  }else {
    route = listOfStations.slice(endIndex, startIndex + 1).reverse();
  }
  return route;
}

export function getRouteByName(startName, endName) {
  if(!stations || stations.length === 0) return [];
  const startStation = stations.find(s => s.stopName === startName);
  const endStation = stations.find(s => s.stopName === endName);
  if(!startStation || !endStation) return [];
  const line = stations.filter(s => s.routeId === startStation.routeId);
  const startIndex = line.findIndex(s => s.stopName === startStation.stopName);
  const endIndex = line.findIndex(s => s.stopName === endStation.stopName);
  if(startIndex === -1 || endIndex === -1) return [];
  let route;
  if(startIndex < endIndex) {
    route = line.slice(startIndex, endIndex + 1);
  }else {
    route = line.slice(endIndex, startIndex + 1).reverse;
  }
  return route;
}

export function getStationByName(name) {
  return stations.find(s => s.stopName === name || null);
}