import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './booking.css';
import Navbar from './components/Navbar';

export default function BookingPage() {
  const { currentUser } = useAuth();

  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  useEffect(() => {
    if (currentUser?.id) {
      axios
        .get(`http://localhost:5000/api/bookings/user/${currentUser.id}`)
        .then((res) => setUserBookings(res.data))
        .catch((err) => console.error("Booking fetch error", err));
    }
  }, [currentUser]);

  useEffect(() => {
    if (service && date) {
      const formattedDate = date.toISOString().split("T")[0];
      axios
        .get(`http://localhost:5000/api/bookings/availability?date=${formattedDate}&service=${service}`)
        .then((res) => setUnavailableSlots(res.data))
        .catch((err) => console.error("Availability fetch error", err));
    }
  }, [service, date]);

  const handleBooking = async () => {
    if (!service || !date || !time) return alert("Fill all fields");

    try {
      const payload = {
        userId: currentUser?.id,
        service,
        date: date.toISOString().split("T")[0],
        time,
        email: currentUser?.email
      };

      await axios.post("http://localhost:5000/api/bookings", payload);

      // Reset + refresh
      setTime("");
      const updated = await axios.get(`http://localhost:5000/api/bookings/user/${currentUser.id}`);
      setUserBookings(updated.data);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("❌ Booking failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h1 className="booking-title">📅 Book a Consultation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="booking-label">Which service are you booking for?</p>
            <div className="service-options">
              {["Solar Panel", "EV Chargers", "Smart Home Energy Systems"].map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`service-btn ${service === s ? "selected" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="booking-label">Pick a Date:</p>
              <div className="calendar-wrapper">
                <Calendar value={date} onChange={setDate} minDate={new Date()} />
              </div>
            </div>
          </div>

          <div>
            <p className="booking-label mt-6">Choose a Time Slot:</p>
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
          ✅ Finalise Booking
        </button>

        {userBookings.length > 0 && (
          <div className="booking-history">
            <h2>Your Bookings</h2>
            <ul>
              {userBookings.map((b) => (
                <li key={b.id}>
                  {b.service} on {b.date} at {b.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
