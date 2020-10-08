import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import * as covidData from "./data/japan-covid.json";
import "./App.css";

function App() {
  const [viewport, setViewPort] = useState({
    latitude: 36,
    longitude: 137,
    width: "100vw",
    height: "100vh",
    zoom: 4.5,
  });
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/cieloginzafarm/ckg0gyibf04ld1aqds8wen9jh"
        onViewportChange={(viewport) => {
          setViewPort(viewport);
        }}
      >
        {covidData.area.map((prefecture) => (
          <Marker
            key={prefecture.name}
            latitude={prefecture.coordinates[0]}
            longitude={prefecture.coordinates[1]}
          >
            <button class="marker-btn">
              <img src="/covid.png" alt="Japan Covid Icon"/>
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
