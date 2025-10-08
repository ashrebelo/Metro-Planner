import { useState } from 'react';
import './Planner.css';

function Planner(
  {stations, startStation, setStartStation, endStation, setEndStation, setDisplayRoute}
) {
  const [routeStation, setRouteStation] = useState([]);
  const [endDisplay, setEndDisplay] = useState(false);
  
  async function handleStartChange(event) {
    const selectedName = event.target.value;
    const selectedStation = stations.find(st => st.stop_name === selectedName);
    setStartStation(selectedStation);
    const res = await fetch(`/api/end/${selectedStation.route_id}`);
    const data = await res.json();
    setRouteStation(data);
    setEndDisplay(true);
  }
  function handleEndStation(event) {
    const selectedName = event.target.value;
    const selectedStation = filteredStations.find(st => st.stop_name === selectedName);
    setEndStation(selectedStation);
    setDisplayRoute(true);
  }

  const filteredStations = routeStation.filter(
    (s) => s.stop_name !== startStation
  );
  
  return (
    <section id="trip-planner">
      <h1>Metro Trip Planner</h1>
      <h2>Select Start and End Stations</h2>
      <div>
        <label htmlFor="start-stations">Start Station:</label>
        <select 
          name="start-stations"
          value={startStation || ''}
          onChange={handleStartChange}>
          <option>-- Select Start --</option>
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
            value={endStation}
            onChange={handleEndStation}>
            <option>-- Select End --</option>
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