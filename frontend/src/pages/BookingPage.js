import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Don't forget this!

export default function BookingPage() {
  const { currentUser } = useAuth();

  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  // Get user's bookings
  useEffect(() => {
    if (currentUser?.id) {
      axios
        .get(`http://localhost:5000/api/bookings/user/${currentUser.id}`)
        .then((res) => setUserBookings(res.data))
        .catch((err) => console.error("Booking fetch error", err));
    }
  }, [currentUser]);

  // Get unavailable slots for selected date + service
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
      };

      await axios.post("http://localhost:5000/api/bookings", {
        userId: currentUser?.id,
        service,
        date: date.toISOString().split("T")[0],
        time,
        email: currentUser?.email // ✅ required for email to work
      });

      // Reset + refresh
      setTime("");
      const updated = await axios.get(`http://localhost:5000/api/bookings/user/${currentUser.id}`);
      setUserBookings(updated.data);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("❌ Booking failed");
    }
  };
  console.log("Selected service:", service);
  console.log("Selected time:", time);
  console.log("🧠 currentUser:", currentUser);



  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Bookings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <p className="font-semibold">Which service are you booking for?</p>
        {["Solar Panel", "EV Chargers", "Smart Home Energy Systems"].map((s) => (
            <button
            key={s}
            onClick={() => setService(s)}
            className={`px-3 py-2 mr-2 rounded border transition duration-150 ${
                service === s
                ? "bg-green-600 text-white border-green-700"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
            >
            {s}
            </button>
        ))}
        </div>


        <div className="space-y-4">
          <p className="font-semibold">Pick a Date:</p>
          <Calendar value={date} onChange={setDate} minDate={new Date()} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Available Slots:</p>
        <div className="flex gap-2 flex-wrap">
            {["10:00", "11:00", "12:00", "14:00", "16:00"].map((slot) => {
            const isUnavailable = unavailableSlots.includes(slot);
            const isSelected = time === slot;

            return (
                <button
                key={slot}
                onClick={() => setTime(slot)}
                disabled={isUnavailable}
                className={`px-3 py-1 rounded border transition duration-150 ${
                    isUnavailable
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
                >
                {slot}
                </button>
            );
            })}
        </div>
        </div>


      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleBooking}>
        Finalise Booking
      </button>

      {userBookings.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">Your Bookings</h2>
          <ul className="list-disc ml-6">
            {userBookings.map((b) => (
              <li key={b.id}>
                {b.service} on {b.date} at {b.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
