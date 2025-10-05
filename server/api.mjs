import express from 'express';
import { readGeoJSON, getStations, getSationsOnLine, getRoute } from './read_file.mjs';

const app = express();
const port = 3000;
let server;

//Remove this test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/s', (req, res) => {
  const result = getStations();
  res.send(result);
});

app.get('/end/:route_id', (req, res) => {
  const { route_id } = req.query;
  res.send(getSationsOnLine(route_id));
});

app.get('/route/:start_station/:end_station', (req,res) => {
  const {start_station, end_station } = req.query;
  res.send(getRoute(start_station, end_station));
});

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

startServer();

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal reveived: closing HTTP server')
  server.close(() => {
    console.debug('HTTP server closed')
  })
})
