import express from 'express';
import { readGeoJSON, getStations, getStationsOnLine, getRoute } from './read_file.mjs';

const app = express();
const port = 3000;
let server;

//Remove this test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/s', (req, res) => {
  const result = getStations();
  res.json(result);
});

app.get('/api/end/:route_id', (req, res) => {
  const { route_id } = req.params;
  const result = getStationsOnLine(route_id);
  res.json(result);
});

app.get('/api/routetrip/:start_station_id/:end_station_id', (req, res) => {
  const {start_station_id, end_station_id } = req.params;
  const start = start_station_id.toString()
  const end = end_station_id.toString();
  const result = getRoute(start_station_id, end_station_id);
  res.json(result);
});

async function startServer() {
  try {
    const stmData = await readGeoJSON();
    if(!stmData || stmData.lenght == 0) {
      process.exit(1);
    }
    server = app.listen(port, () => {
      console.log(`Example app app listening at http://localhost:${port}`);
    });
  }catch(error) {
    console.error('Read Fail, Server End', error);
  }
}

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal reveived: closing HTTP server')
  server.close(() => {
    console.debug('HTTP server closed')
  })
})
startServer();