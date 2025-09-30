import express from 'express';

const app = express();
const port = 3000;

//Remove this test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function startServer() {
  try {
    const stmData = await readGeoJSON();
    app.listen(port, () => {
      console.log(`Example app app listening at http://localhost:${port}`);
    });
  }catch(error) {
    console.error('Read Fail, Server End', error);
  }
}

