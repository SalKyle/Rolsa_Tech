import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords]);
  return null;
}

export default function EVMap({ userLocation, stations }) {
  console.log("📍 Station data:", stations);
  
  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "75vh", width: "100%" }}>
      <RecenterMap coords={userLocation} />
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.5074, -0.1278]}>
        <Popup>Test Marker</Popup>
      </Marker> */}


      {stations.map((station, i) => {
        const lat = station?.AddressInfo?.Latitude;
        const lon = station?.AddressInfo?.Longitude;

        // Log each station's coords
        console.log(`📌 Station ${i}:`, lat, lon);

        if (!lat || !lon) return null;

        return (
          <Marker key={i} position={[lat, lon]}>
            <Popup>
              <strong>{station.AddressInfo.Title}</strong><br />
              {station.AddressInfo.AddressLine1}<br />
              {station.Connections?.[0]?.ConnectionType?.Title || "Unknown type"}
            </Popup>
          </Marker>
        );
      })}


    </MapContainer>
  );
}
