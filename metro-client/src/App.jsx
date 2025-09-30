//import { useState } from "react";
import './App.css';
import MapExample from './components/MapExample';

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
