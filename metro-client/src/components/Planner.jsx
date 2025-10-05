import './Planner.css';

function Planner({stations, startStation, setStartStation, endStation, setEndStation}) {
  const [routeStation, setRouteStation] = useState([]);
  

  async function handleStartChange(event) {
    const selectedName = event.target.value;
    setStartStation(selectedName);
    const res = await fetch(`/api/end/${startStation.id}`);
    const data = await res.json();
    setRouteStation(data);
  }

  function handleEndStation(event) {
    setEndStation(event.target.value);
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
            return <option key={station.id} value={station.stop_name}>{station.stop_name}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="end-stations">End Station:</label>
        <select 
          name="end-stations"
          value={endStation || ''}
          onChange={handleEndStation}>
          <option>-- Select End --</option>
          {routeStation.map((station) => {
            return <option key={station.id} value={station.stop_name}>{station.stop_name}</option>;
          })}
        </select>
      </div>
    </section>
  );
}

export default Planner;