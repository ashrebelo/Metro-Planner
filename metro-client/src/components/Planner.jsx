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
 * @param setDisplayRoute set display to true when the trip is set
 * @returns the planner section
 */
function Planner(
  {stations, 
    startStation, setStartStation, 
    endStation, setEndStation, 
    setRouteTrip, 
    setDisplayRoute}
) {
  const [routeStation, setRouteStation] = useState([]);
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
    if(event.target.value === '') {
      setStartStation('');
      setEndStation('');
      setEndDisplay(false);
      setDisplayRoute(false);
      setRouteTrip([]);
      return;
    }
    const selectedName = event.target.value;
    const selectedStation = stations.find(st => st.stop_name === selectedName);
    const res = await fetch(`/api/end/${selectedStation.route_id}`);
    const data = await res.json();
    setStartStation(selectedStation);
    setRouteStation(data);
    setEndDisplay(true);
    setEndStation('');
    setDisplayRoute(false);
    setRouteTrip([{}]);
  }
  /**
   * takes select station and sets endStation
   * sets displayRoute to true
   * @param event refer to end station that was selected
   */
  function handleEndStation(event) {
    const selectedName = event.target.value;
    const selectedStation = filteredStations.find(st => st.stop_name === selectedName);
    setEndStation(selectedStation);
    setDisplayRoute(true);
  }

  /*create filter list of station on the line excluding the start station */
  let filteredStations = [];
  if(startStation !== undefined) {
    filteredStations = routeStation.filter(
      (s) => s.stop_name !== startStation.stop_name
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
          value={startStation?.stop_name || ''}
          onChange={handleStartChange}>
          <option value="">-- Select Start --</option>
          {stations.map((station) => {
            return <option key={`${station.route_id}-${station.id}-${station.stop_name}`} 
              value={station.stop_name}>
              {station.stop_name}
            </option>;
          })}
        </select>
      </div>
      {endDisplay && 
        <div>
          <label htmlFor="end-stations">End Station:</label>
          <select 
            name="end-stations"
            value={endStation?.stop_name || ''}
            onChange={handleEndStation}>
            <option value="">-- Select End --</option>
            {filteredStations.map((station, index) => {
              return <option key={index} 
                value={station.stop_name}>
                {station.stop_name}
              </option>;
            })}
          </select>
        </div>
      }
    </section>
  );
}
export default Planner;