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
  const [backendData, setBackendData] = useState([{}]);
  const [routeTrip, setRouteTrip] = useState([{}]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');

  useEffect(() => {
    fetch('/api/s').then(
      res => res.json()
    ).then(
      data => {
        setBackendData(data);
      }
    );
  }, []);

  useEffect(() => {
    if(startStation && endStation) {
      getRouteTrip();
    }
  }, [startStation, endStation]);

  /**
   * fetch from the api using startStation and endStation
   */
  async function getRouteTrip() {
    const res = await fetch(`/api/routetrip/${startStation.id}/${endStation.id}`);
    const data = await res.json();
    setRouteTrip(data);
  }
  return (
    <div className="App">
      <Planner stations={backendData}
        startStation={startStation}
        setStartStation={setStartStation}
        endStation={endStation}
        setEndStation={setEndStation}
        setRouteTrip={setRouteTrip}/>
      {startStation && endStation && <TripRoute routeTrip={routeTrip}/>}
    </div>
  );
}

export default App;
