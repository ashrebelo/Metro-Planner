import './Planner.css';

function Planner({stations}) {
  return (
    <section id="trip-planner">
      <h1>Metro Trip Planner</h1>
      <h2>Select Start and End Stations</h2>
      <div>
        <label htmlFor="start-stations">Start Station:</label>
        <select name="start-stations">
          <option>-- Select Start --</option>
          {stations.map((station) => {
            <option>{station.stop_name}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="end-stations">End Station:</label>
        <select name="end-stations">
          <option>-- Select End --</option>
        </select>
      </div>
    </section>
  );
}

export default Planner;