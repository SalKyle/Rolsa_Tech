import { useState, useEffect } from "react";
import axios from "axios";
import EnergyChart from "./components/EnergyChart";
import { useAuth } from "../context/AuthContext"; 




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
      userId: currentUser?.id || null, // optional for now
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
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Energy Usage Tracker</h1>

      <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-6">
        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="Enter usage in kWh"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Add
        </button>
      </form>

      <EnergyChart data={entries} />
    </div>
  );
}
