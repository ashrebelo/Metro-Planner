import { useState, useEffect } from 'react';
import './App.css';
import MapExample from './components/MapExample';
import Planner from './components/Planner';
import Stations from './components/Stations';

const stations = [
  {'stop_name' : 'Station Angrinon', 'route_id' : '1'},
  {'stop_name' : 'Station Monk', 'route_id' : '1'}
];

const colors = ['green', 'orange', 'null', 'yellow', 'blue'];

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [tripRoute, setTripRoute] = useState([]);
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
  const routeId = parseInt(stations[0].route_id, 10);
  const color = colors[routeId - 1];
  return (
    <div className="App">
      <Planner stations={backendData}
        startStation={startStation}
        setStartStation={setStartStation} 
        setEndStation={setEndStation}/>
      <Stations stations={stations} color={color}/>
      <MapExample />
    </div>
  );
}

export default App;
