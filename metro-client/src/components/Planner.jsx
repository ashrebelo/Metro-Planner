import { useState } from 'react';
import './Planner.css';

function Planner(
  {stations, startStation, setStartStation, endStation, setEndStation}
) {
  const [routeStation, setRouteStation] = useState([]);
  
  async function handleStartChange(event) {
    const selectedName = event.target.value;
    const selectedStation = stations.find(st => st.stop_name === selectedName);
    setStartStation(selectedStation);
    const res = await fetch(`/api/end/${selectedStation.route_id}`);
    const data = await res.json();
    setRouteStation(data);
  }
  
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
      {startStation && <EndPlanner 
        endStation={endStation} 
        setEndStation={setEndStation} 
        routeStation={routeStation}
        startStation={startStation}
        stations={stations}/>}
    </section>
  );
}

export default Planner;