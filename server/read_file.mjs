import { parse } from 'csv-parse/sync';
import path from 'path';
import * as fs from 'node:fs/promises';

const filePath = 'data/stm_arrets_sig.geojson';

let stmData = [];

async function readGeoJSON() {
  if(stmData.length === 0) {
    const content = await fs.readFile(filePath, 'utf8');
    const geoData = await JSON.parse(content);
    stmData =  geoData.features;
  }
  return stmData;
}

function getStation() {

}