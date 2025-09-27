# A2 Metro Trip Planner

Express + React app

Description: 
- Metro trip planner
    - select station
        - Start Station: (can be any station)
        - End Station: (only station on the line)
    - Once a line is picked
        - Shows all the stations along the line
        - Displays a map with the line of the trip and puts the point for the stations (map code already there)
    - When selecting a point on the map
        - description of the station (from api)
        - highlight the station in the section above
- if reading the file fails -> don't start listenser
     
## Structure

There are two directories in the __root__ of the project.

* The Express server is in `server/`
* The React app is in `metro-client/
* The server responds to API calls and serves the __built__ React app.

There are 3 package.json files -- see what `scripts` they define.

## Setup

To install all the dependencies and build the React app run:

```
npm run build
```

## To run the app

### Just the client

```
cd metro-client
npm run dev
```

### Just the server

> Fill this in 

### Client and Server


> Fill this in 

