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
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://rolsa-tech-ea9t.onrender.com';

  const { t } = useTranslation(); 

  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  useEffect(() => {
    if (currentUser?.id) {
      axios
        .get(`${API_BASE_URL}/api/bookings/user/${currentUser.id}`)//gets the bookings for the current user
        .then((res) => setUserBookings(res.data))
        .catch((err) => console.error("Booking fetch error", err));
    }
  }, [currentUser]);

  useEffect(() => {
    if (service && date) {
      const formattedDate = date.toISOString().split("T")[0];
      axios
        .get(`${API_BASE_URL}/api/bookings/availability?date=${formattedDate}&service=${service}`)//gets the available slots for the selected date and service1
        .then((res) => setUnavailableSlots(res.data))
        .catch((err) => console.error("Availability fetch error", err));
    }
  }, [service, date]);

  const handleBooking = async () => {
    if (!service || !date || !time) return alert(t("booking.fill_all_fields", "Fill all fields"));

    try {
      const payload = {
        userId: currentUser?.id,
        service,
        date: date.toISOString().split("T")[0],
        time,
        email: currentUser?.email
      };

      await axios.post(`${API_BASE_URL}/api/bookings`, payload);//sends tthe fianlise dbooking

      setTime("");
      const updated = await axios.get(`${API_BASE_URL}/api/bookings/user/${currentUser.id}`);//gets the updated bookings
      setUserBookings(updated.data);
    } catch (err) {
      console.error("Booking failed:", err);
      alert(t("booking.failed", "Booking failed"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h1 className="booking-title">{t("booking.header", "Book a Consultation")}</h1>

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
                  {t(`booking.services.${s}`, s)}
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

        <button onClick={handleBooking} className="booking-submit-btn">
          {t("booking.finalize_button", "Finalise Booking")}
        </button>

        {userBookings.length > 0 && (
          <div className="booking-history">
            <h2>{t("booking.your_bookings", "Your Bookings")}</h2>
            <ul>
              {userBookings.map((b) => (
                <li key={b.id}>
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
