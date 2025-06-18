import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const States = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/nigeria.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties.NAME_1 || "Unknown State");
          }}
          style={() => ({
            color: "#000000",
            weight: 1.5,
            fillOpacity: 0.3,
          })}
        />
      )}
    </MapContainer>
  );
};

export default States;
