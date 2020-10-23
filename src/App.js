import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import * as covidData from "./data/japan-covid.json";
import * as farbotData from "./data/farbot.json";
import "./App.css";

function App() {
  const [viewport, setViewPort] = useState({
    latitude: 36.121075,
    longitude: 139.215913,
    width: "100vw",
    height: "100vh",
    zoom: 18.5,
  });

  const [selectedWaypoint, setSelectedWaypoint] = useState(null);

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === "Escape") {
        setSelectedWaypoint(null);
      }
    };

    const mouseListener = () => {
      setSelectedWaypoint(null);
    };

    window.addEventListener("keydown", keyListener);
    window.addEventListener("mousedown", mouseListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
      window.removeEventListener("mousedown", mouseListener);
    };
  }, []);
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
        {farbotData.SENSOR.map((waypoint) => (
          <Marker
            key={waypoint.name}
            latitude={waypoint.coordinates.latitude}
            longitude={waypoint.coordinates.longitude}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedWaypoint(waypoint);
              }}
            >
              <img src="/ginzafarm.png" alt="Japan Covid Icon" />
            </button>
          </Marker>
        ))}
        {selectedWaypoint && (
          <Popup
            latitude={selectedWaypoint.coordinates.latitude}
            longitude={selectedWaypoint.coordinates.longitude}
            onClose={() => {
              setSelectedWaypoint(null);
            }}
          >
            <div>
              <h2>{selectedWaypoint.name}</h2>
              <p>Date: {selectedWaypoint.date}</p>
              <p>
                Temperature: {" "}
                {selectedWaypoint.temperature}
              </p>
              <p>Humidity: {selectedWaypoint.humidity}</p>
              <p>CO2: {selectedWaypoint.co2}</p>
            </div>
          </Popup>
        )}
        {/* <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        /> */}
      </ReactMapGL>
    </div>
  );
}

export default App;
