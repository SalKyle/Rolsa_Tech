import { useState, useEffect } from "react";
import { AreaChart, Area } from "recharts";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Navbar from "./components/Navbar";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [cfData, setCfData] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return;

    // Fetch CF history
    axios.get(`http://localhost:5000/api/cf/${currentUser.id}`)
      .then(res => setCfData(res.data))
      .catch(err => console.error("Failed to load CF data", err));

    // Fetch bookings
    axios.get(`http://localhost:5000/api/bookings/user/${currentUser.id}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error("Failed to load bookings", err));
  }, [currentUser]);
  const [energyEntries, setEnergyEntries] = useState([]);

    useEffect(() => {
        if (!currentUser?.id) return;

        // Fetch energy entries
        axios.get(`http://localhost:5000/api/energy/${currentUser.id}`)
            .then(res => setEnergyEntries(res.data))
            .catch(err => console.error("Failed to load energy data", err));
    }, [currentUser]);

  // Prepare data for chart
  const chartData = cfData.map(entry => ({
    date: new Date(entry.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
    total: parseFloat(entry.total),
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-8">📊 Your Dashboard</h1>

      {/* Carbon Footprint Chart */}
      <div className="mb-12 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">🌍 Carbon Footprint Trend</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No footprint data yet.</p>
        )}
      </div>
      {/* Energy Usage Trend */}
      <div className="mb-12 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">⚡ Energy Usage Over Time</h2>
        {energyEntries.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={energyEntries.map(e => ({
                date: new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
                usage: e.usage,
                }))}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey="usage" stroke="#0ea5e9" fill="#bae6fd" />
            </AreaChart>
            </ResponsiveContainer>
        ) : (
            <p className="text-gray-500">No energy data available yet.</p>
        )}
        </div>

      {/* Bookings Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">📅 Upcoming Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="list-disc ml-5">
            {bookings.map((b) => (
              <li key={b.id}>
                <strong>{b.service}</strong> on {b.date} at {b.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming bookings.</p>
        )}
      </div>
    </div>
  );
}
