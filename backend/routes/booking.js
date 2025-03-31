const express = require("express");
const router = express.Router();
const BookingModel = require("../models/bookingModel");
const nodemailer = require("nodemailer");

// POST: Create booking + send confirmation email
router.post("/", async (req, res) => {
  const { userId, service, date, time, email } = req.body;

  if (!userId || !service || !date || !time || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // ✅ 1. Create booking
    const booking = await BookingModel.create({ userId, service, date, time });

    // ✅ 2. Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'Mailtrap', 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Rolsa Bookings" <${process.env.EMAIL_USER}>`,
      to: email, // ✅ sent from frontend
      subject: "Your Booking is Confirmed ✅",
      text: `Hello!\n\nYour booking for "${service}" on ${date} at ${time} is confirmed.\n\nThanks for choosing Rolsa!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("❌ Email failed:", error.message);
      else console.log("📨 Email sent:", info.response);
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Booking failed" });
  }
});

// GET: All bookings for a specific user
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const bookings = await BookingModel.getByUser(userId);
    res.json(bookings);
  } catch (err) {
    console.error("User bookings error:", err);
    res.status(500).json({ error: "Could not fetch user bookings" });
  }
});
router.get("/availability", async (req, res) => {
  const { date, service } = req.query;

  if (!date || !service) {
    return res.status(400).json({ error: "Missing date or service" });
  }

  try {
    const bookings = await BookingModel.getBookedSlots(date, service);
    const bookedTimes = bookings.map((b) => b.time);
    res.json(bookedTimes);
  } catch (err) {
    console.error("Availability error:", err);
    res.status(500).json({ error: "Could not fetch availability" });
  }
});
module.exports = router;
