import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './booking.css';
import Navbar from './components/Navbar';
import { useTranslation } from "react-i18next"; 

export default function BookingPage() {
  const { currentUser } = useAuth();
  
  // Create CORS proxy configuration
  const API_URL = 'https://rolsa-tech.onrender.com';
  // Use CORS proxy to bypass CORS restrictions
  const CORS_PROXY = 'https://corsproxy.io/?';
  const getProxiedUrl = (url) => `${CORS_PROXY}${encodeURIComponent(url)}`;

  const { t } = useTranslation(); 

  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user bookings when component mounts or user changes
  useEffect(() => {
    if (currentUser?.id) {
      setLoading(true);
      setUserBookings([]); // Clear existing data while loading
      
      // Use the CORS proxy for the request
      axios
        .get(getProxiedUrl(`${API_URL}/api/bookings/user/${currentUser.id}`))
        .then((res) => {
          setUserBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Booking fetch error", err);
          setError("Could not load your bookings. Please try again later.");
          setLoading(false);
        });
    }
  }, [currentUser]);

  // Fetch availability when service or date changes
  useEffect(() => {
    if (service && date) {
      const formattedDate = date.toISOString().split("T")[0];
      setLoading(true);
      
      // Use the CORS proxy for the request
      axios
        .get(getProxiedUrl(`${API_URL}/api/bookings/availability?date=${formattedDate}&service=${service}`))
        .then((res) => {
          setUnavailableSlots(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Availability fetch error", err);
          setUnavailableSlots([]);
          setLoading(false);
        });
    }
  }, [service, date]);

  const handleBooking = async () => {
    if (!service || !date || !time) {
      return alert(t("booking.fill_all_fields", "Please fill all fields"));
    }
    
    if (!currentUser?.id) {
      return alert(t("booking.login_required", "Please login to book a consultation"));
    }

    try {
      setLoading(true);
      
      const payload = {
        userId: currentUser.id,
        service,
        date: date.toISOString().split("T")[0],
        time,
        email: currentUser.email
      };

      // Use the CORS proxy for the POST request
      await axios.post(getProxiedUrl(`${API_URL}/api/bookings`), payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setTime("");
      alert(t("booking.success", "Booking successful!"));
      
      // Refresh bookings list
      const updated = await axios.get(getProxiedUrl(`${API_URL}/api/bookings/user/${currentUser.id}`));
      setUserBookings(updated.data);
      setLoading(false);
    } catch (err) {
      console.error("Booking failed:", err);
      setError(t("booking.failed", "Booking failed. Please try again."));
      setLoading(false);
      alert(t("booking.failed", "Booking failed. Please try again."));
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h1 className="booking-title">{t("booking.header", "Book a Consultation")}</h1>
        
        {error && <div className="error-message">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="booking-label">{t("booking.service_label", "Which service are you booking for?")}</p>
            <div className="service-options">
              {["Solar Panel", "EV Chargers", "Smart Home Energy Systems"].map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`service-btn ${service === s ? "selected" : ""}`}
                >
                  {t(`booking.services.${s.replace(/\s+/g, '_').toLowerCase()}`, s)}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="booking-label">{t("booking.date_label", "Pick a Date:")}</p>
              <div className="calendar-wrapper">
                <Calendar value={date} onChange={setDate} minDate={new Date()} />
              </div>
            </div>
          </div>

          <div>
            <p className="booking-label mt-6">{t("booking.time_label", "Choose a Time Slot:")}</p>
            <div className="slot-options">
              {["10:00", "11:00", "12:00", "14:00", "16:00"].map((slot) => {
                const isUnavailable = unavailableSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    disabled={isUnavailable}
                    className={`slot-btn ${isUnavailable ? "disabled" : time === slot ? "selected" : ""}`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button 
          onClick={handleBooking} 
          className="booking-submit-btn"
          disabled={loading || !service || !time}
        >
          {loading ? t("booking.processing", "Processing...") : t("booking.finalize_button", "Finalise Booking")}
        </button>

        {loading && <div className="loading-indicator">Loading...</div>}

        {userBookings.length > 0 && (
          <div className="booking-history">
            <h2>{t("booking.your_bookings", "Your Bookings")}</h2>
            <ul>
              {userBookings.map((b, index) => (
                <li key={b.id || index}>
                  {b.service} {t("booking.on", "on")} {b.date} {t("booking.at", "at")} {b.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}