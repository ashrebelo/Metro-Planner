import * as fs from 'node:fs/promises';
import path from 'path';

const fileName = 'stm_arrets_sig.geojson';

let stmData = [];

export async function readGeoJSON() {
  if(stmData.length === 0) {
    try {
      const filePath = path.join('./data', fileName);
      const content = await fs.readFile(filePath, 'utf8');
      const geoData = await JSON.parse(content);
      stmData =  geoData.features || geoData;
    }catch(error) {
      console.error('Failed File Reading', error);
      stmData = [];
    }
  }
  return stmData;
}

function getStation() {

}