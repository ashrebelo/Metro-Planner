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
app.get('/api/routetrip/:startName/:endName', (req, res) => {
  try {
    const {startName, endName } = req.params;
    if(!startName || !endName) {
      return res.status(400).json({error: 'Stations name Invaild'});
    }
    const result = getRouteByName(startName, endName);
    if(!result || result.length === 0) {
      return res.status(404).json({error : 'No Route Found'});
    }
    return res.status(200).json(result);
  }catch (err) {
    res.status(500).json({error: 'Server error' + err.message});
  }
});

/**
 * default
 * https://expressjs.com/en/starter/static-files.html
 */
app.use((req, res) => {
  return res.sendFile(path.join(__dirname, '../metro-client/dist/index.html'));
});

/**
 * only starts the server if the file read was successful
 */
async function startServer() {
  try {
    const stmData = await readGeoJSON();
    if(!stmData || stmData.length === 0) {
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
  console.debug('SIGTERM signal reveived: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});

startServer();