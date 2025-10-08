import { useState, useEffect } from 'react';
import './App.css';
import Planner from './components/Planner';
import TripRoute from './components/TripRoute';

const colors = ['green', 'orange', 'null', 'yellow', 'blue'];

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

  async function getRouteTrip() {
    const res = await fetch(`/api/route/${startStation.id}/${endStation.id}`);
    const data = await res.json();
    setRouteTrip(data);
  }

  const [displayRoute, setDisplayRoute] = useState(false);

  const routeId = parseInt(backendData[0].route_id, 10);
  const color = colors[routeId - 1];
  return (
    <div className="App">
      <Planner stations={backendData}
        startStation={startStation}
        setStartStation={setStartStation} 
        setEndStation={setEndStation}
        setRouteTrip={setRouteTrip}
        setDisplayRoute={setDisplayRoute}/>
      {displayRoute && <TripRoute routeTrip={routeTrip} color={color}/>}
    </div>
  );
}

export default App;
