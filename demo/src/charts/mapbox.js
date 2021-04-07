import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "60vw",
  height: "33vw",
  position: "absolute",
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ3dlaW56IiwiYSI6ImNrZ3FzanFtcTBhcXgzMXFoNTVseDJhY2MifQ.Ot2t8T1J1CPHRF1OVoP-kg";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/gweinz/cki10igr61okp19r117eqxs9d", // stylesheet location
        center: [-98.34, 39.25], // starting position [lng, lat]
        zoom: 3.3,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
