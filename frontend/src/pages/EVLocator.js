import { useEffect, useState } from "react";
import axios from "axios";
import EVMap from "./components/EVMap";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Navbar from "./components/Navbar";


export default function EVLocator() {
  const [userLocation, setUserLocation] = useState([51.5074, -0.1278]); // London fallback
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
        alert("❌ Location not found. Please enter a valid postcode or city.");
        return;
      }
  
      const loc = results[0].geometry.location;
      const coords = [loc.lat, loc.lng];
      setUserLocation(coords);
      fetchStations(coords);
    } catch (err) {
      console.error("Search error:", err.message);
      alert("Something went wrong while searching. Try again.");
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
    <div className="p-4 space-y-4">
        <Navbar />
      <h1 className="text-2xl font-bold text-center">EV Charging Station Locator</h1>
      <SearchBar onSearch={handleSearch} />
      <Filters filters={filters} setFilters={setFilters} />
      <EVMap userLocation={userLocation} stations={filteredStations} />
    </div>
  );
}
