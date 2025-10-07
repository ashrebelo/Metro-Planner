import './Planner.css';

function EndPlanner({endStation, setEndStation, routeStation, startStation}) {

  function handleEndStation(event) {
    const selectedName = event.target.value;
    const selectedStation = filteredStations.find(st => st.stop_name === selectedName);
    setEndStation(selectedStation);
  }

  return (
    <section id="trip-planner">
      <label htmlFor="end-stations">End Station:</label>
      <select 
        name="end-stations"
        value={endStation || ''}
        onChange={handleEndStation}>
        <option>-- Select End --</option>
        {routeStation.map((station) => {
          return <option key={`${station.route_id}-${station.id}-${station.stop_name}`} 
            value={station.stop_name}>
            {station.stop_name}
          </option>;
        })}
      </select>
    </section>
  );
}

export default EndPlanner;