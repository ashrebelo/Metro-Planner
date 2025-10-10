import express from 'express';
import { readGeoJSON, getStations, getStationsOnLine, getRoute } from './read_file.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
let server;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve built React app (dist)
app.use(express.static(path.join(__dirname, '../metro-client/dist')));


/**
 * gets all the stations
 */
app.get('/api/s', (req, res) => {
  const result = getStations();
  res.json(result);
});

/**
 * using the station's route id, it keeps all the other stations with the same route id
 */
app.get('/api/end/:routeId', (req, res) => {
  const { routeId } = req.params;
  if(!routeId || typeof routeId !== 'string') {
    return [];
  }
  const result = getStationsOnLine(routeId);
  res.json(result);
});

/**
 * using the start and end station ids if find the route
 * return json
 */
app.get('/api/routetrip/:start_station_id/:end_station_id', (req, res) => {
  const {start_station_id, end_station_id } = Number(req.params);
  if(isNaN(start_station_id) && isNaN(end_station_id)) {
    return [];
  }
  const start = start_station_id.toString()
  const end = end_station_id.toString();
  const result = getRoute(start_station_id, end_station_id);
  res.json(result);
});

/**
 * default
 * https://expressjs.com/en/starter/static-files.html
 */
const path = require('path');
app.use(express.static(path.join(__dirname, '../metro-client/public')));

/**
 * only starts the server if the file read was successful
 */
async function startServer() {
  try {
    const stmData = await readGeoJSON();
    if(!stmData || stmData.length == 0) {
      process.exit(1);
    }
    server = app.listen(port, () => {
      console.log(`Example app app listening at http://localhost:${port}`);
    });
  }catch(error) {
    console.error('Read Fail, Server End', error);
  }
}

/**
 * end gracefully
 */
process.on('SIGTERM', () => {
  console.debug('SIGTERM signal reveived: closing HTTP server')
  server.close(() => {
    console.debug('HTTP server closed')
  })
})
startServer();