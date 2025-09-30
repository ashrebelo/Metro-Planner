//import { useState } from "react";
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
  const routeId = parseInt(stations[0].route_id, 10);
  const color = colors[routeId - 1];
  return (
    <div className="App">
      <Planner />
      <Stations stations={stations} color={color}/>
      <MapExample />
    </div>
  );
}

export default App;
