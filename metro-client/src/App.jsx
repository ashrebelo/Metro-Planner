import { useState, useEffect } from 'react';
import './App.css';
import Planner from './components/Planner';
import TripRoute from './components/TripRoute';

/**
 * Holds the useState for varables needed for both planner and TripRoute
 * Fetches to routeTrip using api
 * @returns Planner component
 * @returns TripRoute component only if displayRoute is true
 */
function App() {
  const [backendData, setBackendData] = useState([]);
  const [routeTrip, setRouteTrip] = useState([]);
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/s').then(
      res => res.json()
    ).then(
      data => {
        setBackendData(data);
      }
    );
  }, []);

  /**
   * fetch from the api using startStation and endStation
   */
  useEffect(() => {
    const fetchRoute = async () => {
      setError(null);
      if(startStation && endStation) {
        try {
          const res = await fetch(`/api/routetrip/${startStation.stopName}/${endStation.stopName}`);
          if(!res.ok) {
            const message = await res.text();
            setError(message || 'Could not get Route');
            setRouteTrip([]);
            return;
          }
          const data = await res.json();
          if(!data || data.length === 0) {
            setError('No Route found for the selected Stations');
          }
          setRouteTrip(data);
        } catch (err) {
          setError(`Failed to contact server ${err}`);
        }
      }
    };
    fetchRoute();
  }, [startStation, endStation]);
  
  return (
    <div className="App">
      <Planner stations={backendData}
        startStation={startStation}
        setStartStation={setStartStation}
        endStation={endStation}
        setEndStation={setEndStation}
        setRouteTrip={setRouteTrip}
        setError={setError}/>
      {error && <div className="error-box">{error}</div>}
      {startStation && endStation && <TripRoute routeTrip={routeTrip} error={error}/>}
    </div>
  );
}

export default App;
