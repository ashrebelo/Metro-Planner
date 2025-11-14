import { useState } from 'react';
import './Planner.css';

/**
 * fetches from the api when start station is select
 * sets displayRoute to true when an end station is selected
 * @param stations refers to all the stations from the api
 * @param startStation the selected start station
 * @param setStartStation sets the startStation with useState
 * @param endStation the selected end station
 * @param setEndStation set the endStation with useState
 * @param setRouteTrip set the start to end route, a list
 * @returns the planner section
 */
function Planner(
  {stations, startStation, setStartStation, endStation, setEndStation, setRouteTrip}
) {
  const [routeStations, setRouteStations] = useState([]);
  const [endDisplay, setEndDisplay] = useState(false);
  
  /**
   * takes the station select and sets the startStation
   * fetches the line the startStation is on from the api and sets routeStation
   * sets routeTrip to be empty
   * sets displayRoute to be false
   * sets endStation to be empty
   * sets endDisplay to be true
   * @param event refer to the station selected
   */
  async function handleStartChange(event) {
    try {
      const selectedName = event.target.value;
      if(selectedName === '') {
        setStartStation(null);
        setEndStation(null);
        setEndDisplay(false);
        setRouteStations([]);
        setRouteTrip([]);
        return;
      }
      const resStaion = await fetch(`/api/station/${selectedName}`);
      if(!resStaion.ok) throw new Error('Station not found');
      const fullStation = await resStaion.json();
      const res = await fetch(`/api/end/${fullStation.routeId}`);
      if(!res.ok) throw new Error('Line not found');
      const stationsOnLine = await res.json();
      setStartStation(fullStation);
      setRouteStations(stationsOnLine);
      setEndDisplay(true);
      setEndStation(null);
      setRouteTrip([]);
    } catch(err) {
      return (
        <div className="error-box">
          {err || 'Planner error'}
        </div>
      );
    }
  }
  /**
   * takes select station and sets endStation
   * sets displayRoute to true
   * @param event refer to end station that was selected
   */
  async function handleEndStation(event) {
    try {
      const selectedName = event.target.value;
      const selectedStation = await fetch(`/api/station/${selectedName}`);
      if(!selectedStation.ok) throw new Error('Station not found');
      const station = await selectedStation.json();
      setEndStation(station);
    } catch(err) {
      return (
        <div className="error-box">
          {err || 'Planner error'}
        </div>
      );
    }
  }

  /*create filter list of station on the line excluding the start station */
  let filteredStations = [];
  if(startStation?.stopName) {
    filteredStations = routeStations.filter(
      (name) => name !== startStation.stopName
    );
  }
  
  return (
    <section id="trip-planner">
      <h1>Metro Trip Planner</h1>
      <h2>Select Start and End Stations</h2>
      <div>
        <label htmlFor="start-stations">Start Station:</label>
        <select 
          name="start-stations"
          value={startStation?.stopName || ''}
          onChange={handleStartChange}>
          <option value="" disabled hidden>-- Select Start --</option>
          {stations.map((station) => {
            return <option key={station} value={station}>{station}</option>;
          })}
        </select>
      </div>
      {endDisplay && 
        <div>
          <label htmlFor="end-stations">End Station:</label>
          <select 
            name="end-stations"
            value={endStation?.stopName || ''}
            onChange={handleEndStation}>
            <option value="" disabled hidden>-- Select End --</option>
            {filteredStations.map((station, index) => {
              return <option key={index} 
                value={station}>
                {station}
              </option>;
            })}
          </select>
        </div>
      }
    </section>
  );
}
export default Planner;