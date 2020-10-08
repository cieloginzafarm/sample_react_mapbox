import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
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

  const [selectedPrefecture, setSelectedPrefecture] = useState(null);

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === "Escape") {
      setSelectedPrefecture(null);
    }};

    const mouseListener = () => {
        setSelectedPrefecture(null);
    };
    
    window.addEventListener("keydown", keyListener);
    window.addEventListener("mousedown", mouseListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
      window.removeEventListener("mousedown", mouseListener);
    }
  }, [])
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
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPrefecture(prefecture);
              }}
            >
              <img src="/covid.png" alt="Japan Covid Icon" />
            </button>
          </Marker>
        ))}
        {selectedPrefecture && (
          <Popup
            latitude={selectedPrefecture.coordinates[0]}
            longitude={selectedPrefecture.coordinates[1]}
            onClose={() => {
              setSelectedPrefecture(null);
            }}
          >
            <div>
              <h2>{selectedPrefecture.name}</h2>
              <p>Total Number of Patients: {selectedPrefecture.npatients}</p>
              <p>
                Number of Current Patients:{" "}
                {selectedPrefecture.ncurrentpatients}
              </p>
              <p>Number of Discharged Patients: {selectedPrefecture.nexits}</p>
              <p>Number of Deaths: {selectedPrefecture.ndeaths}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
