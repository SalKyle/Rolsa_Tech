import { useState, useEffect } from "react";//imports
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useTranslation } from "react-i18next"; 
import './Dashboard.css';

export default function Dashboard() {//initialise and export function 
  const { currentUser } = useAuth();
  const { t } = useTranslation(); 

  const [view, setView] = useState("carbon");
  const [cfData, setCfData] = useState([]);
  const [energyEntries, setEnergyEntries] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return;

    axios.get(`http://localhost:5000/api/cf/${currentUser.id}`)//get the data from the backend
      .then(res => setCfData(res.data))
      .catch(err => console.error("Failed to load CF data", err));

    axios.get(`http://localhost:5000/api/bookings/user/${currentUser.id}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error("Failed to load bookings", err));

    axios.get(`http://localhost:5000/api/energy/${currentUser.id}`)
      .then(res => setEnergyEntries(res.data))
      .catch(err => console.error("Failed to load energy data", err));
  }, [currentUser]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  const carbonData = cfData.map(e => ({
    date: formatDate(e.date),//carbonm data
    total: parseFloat(e.total),
  }));

  const energyData = energyEntries.map(e => ({
    date: formatDate(e.date),
    usage: e.usage,//energy chart
  }));

  return (
    <div className="slider">
      <h1 className="slider-text">{t("dashboard.header", "Dashboard")}</h1>

      {/* Slider to select the chart*/}
      <div className="switch">
        {["carbon", "energy", "bookings"].map((option) => (
          <div
            key={option}
            onClick={() => setView(option)}
            className={`options ${
              view === option ? 
                option === "carbon" ? "bg-green-600 text-white" : 
                option === "energy" ? "bg-blue-600 text-white" : 
                "bg-purple-600 text-white" 
              : "text-gray-700 hover:bg-gray-300"}`}
          >
            {t(`dashboard.${option}`, option)}
          </div>
        ))}
      </div>

      {/* Chart Panels*/}
      {view === "carbon" && (
        <div className="cahrt-cont">
          <h2 className="text-xl font-semibold mb-4">
            {t("dashboard.carbon_chart_title", "Carbon Footprint Trend")}
          </h2>
          {carbonData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">{t("dashboard.no_data", "No footprint data yet.")}</p>
          )}
        </div>
      )}

      {view === "energy" && (
        <div className="chart-cont">
          <h2 className="text-xl font-semibold mb-4">{/*use dtailwind for some graph componenets as i saw it was easier to design some mobile components*/}
            {t("dashboard.energy_chart_title", "Energy Usage Over Time")}
          </h2>
          {energyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={energyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey="usage" stroke="#0ea5e9" fill="#bae6fd" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">{t("dashboard.no_data", "No energy data available yet.")}</p>
          )}
        </div>
      )}

      {view === "bookings" && (
        <div className="g-white p-6 rounded shadow booking-section">
          <h2 className="text-xl font-semibold mb-4">{t("dashboard.upcoming_bookings", "Upcoming Bookings")}</h2>{/*Upcoming booking section*/
          }
          {bookings.length > 0 ? (
            <ul className="list-disc ml-5">
              {bookings.map((b) => (
                <li key={b.id}>
                  <strong>{b.service}</strong> {t("dashboard.on", "on")} {b.date} {t("dashboard.at", "at")} {b.time}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">{t("dashboard.no_data", "No upcoming bookings.")}</p>
          )}
        </div>
      )}
    </div>
  );
}
