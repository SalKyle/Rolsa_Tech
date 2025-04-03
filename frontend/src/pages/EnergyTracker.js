import { useState, useEffect } from "react";
import axios from "axios";
import EnergyChart from "./components/EnergyChart";
import { useAuth } from "../context/AuthContext"; 
import Navbar from "./components/Navbar";
import "./energy.css"




export default function EnergyTracker() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState([]);
  const { currentUser } = useAuth();

  // Fetch existing entries from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/energy")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const newEntry = {
      usage: parseInt(input),
      date: new Date().toISOString(),
      userId: currentUser?.id || null, 
    };
    

    try {
      await axios.post("http://localhost:5000/api/energy", newEntry);
      setEntries([...entries, newEntry]);
      setInput("");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <><Navbar />
      <div className="energy-container">
      <h1 className="energy-title">⚡ Energy Usage Tracker</h1>

      <form onSubmit={handleSubmit} className="energy-form">
        <input
          type="number"
          placeholder="Enter usage in kWh"
          value={input}
          onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div className="energy-chart-container">
        <EnergyChart data={entries} />
      </div>
    </div></>
  );
  
}
