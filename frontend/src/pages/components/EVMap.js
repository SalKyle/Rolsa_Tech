import { useEffect, useState } from "react";
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

export default function EVMap({ userLocation, stations }) {
  console.log("📍 Station data:", stations);
  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "75vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station, i) => {
        const lat = station?.AddressInfo?.Latitude;
        const lon = station?.AddressInfo?.Longitude;

        if (!lat || !lon) return null; // 💥 Prevents crash or invisible pins

        return (
          <Marker key={i} position={[lat, lon]}>
            <Popup>
              <strong>{station.AddressInfo?.Title || "Unnamed Station"}</strong><br />
              {station.AddressInfo?.AddressLine1 || "No address"}<br />
              {station.Connections?.[0]?.ConnectionType?.Title || "Unknown type"}
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
}
