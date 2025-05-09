import { useEffect, useState } from "react";
import axios from "axios";
import EVMap from "./components/EVMap";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next"; 
import "./evlocator.css";

export default function EVLocator() {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState([51.5074, -0.1278]); // defaults to London as a base
  const [stations, setStations] = useState([]);
  const [filters, setFilters] = useState({ connector: "", network: "" });

  const fetchStations = async (coords) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chargers?lat=${coords[0]}&lon=${coords[1]}`
      );
      setStations(res.data);
    } catch (err) {
      console.error("Failed to fetch stations:", err.message);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        fetchStations(coords);
      },
      () => {
        console.warn("Geolocation denied. Falling back to London.");
        fetchStations(userLocation);
      }
    );
  }, []);

  const handleSearch = async (place) => {
    try {
      const geoRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          place
        )}&key=AIzaSyA-hFSro0RB1gH1DxebmTCt7ndsCxFMeAI`
      );

      const results = geoRes?.data?.results;
      if (!results || results.length === 0) {
        alert(t("ev_locator.not_found", "Location not found. Please enter a valid postcode or city."));
        return;
      }

      const loc = results[0].geometry.location;
      const coords = [loc.lat, loc.lng];
      setUserLocation(coords);
      fetchStations(coords);
    } catch (err) {
      console.error("Search error:", err.message);
      alert(t("ev_locator.search_failed", "Something went wrong while searching. Try again."));
    }
  };

  const filteredStations = stations.filter((s) => {
    const matchConnector = filters.connector
      ? s.Connections?.some((c) =>
          c.ConnectionType?.Title?.includes(filters.connector)
        )
      : true;
    const matchNetwork = filters.network
      ? s.OperatorInfo?.Title?.includes(filters.network)
      : true;
    return matchConnector && matchNetwork;
  });

  return (
    <>
      <Navbar />
      <div className="ev-page-wrapper">
        <div className="ev-container">
          <h1 className="ev-title">{t("ev_locator.header", "EV Charging Station Locator")}</h1>

          <div className="ev-controls">
            <SearchBar onSearch={handleSearch} />
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="ev-map-container">
          <EVMap userLocation={userLocation} stations={filteredStations} />
        </div>
      </div>
    </>
  );
}
