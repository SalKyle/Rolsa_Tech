const express = require("express");
const router = express.Router();
const db = require("../config/db");
const EnergyModel = require("../models/EnergyModel");

// GET all energy entries
router.get("/", async (req, res) => {
  try {
    const data = await EnergyModel.getAllEntries(); // use model
    res.json(data);
  } catch (err) {
    console.error("Error fetching energy data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new energy entry
router.post("/", async (req, res) => {
  const { usage, date, userId } = req.body;

  if (!usage || !date) {
    return res.status(400).json({ error: "Missing usage or date" });
  }

  try {
    const newEntry = await EnergyModel.addEntry({ usage, date, userId });
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Error inserting energy entry:", err);
    res.status(500).json({ error: "Failed to insert energy entry" });
  }
});

module.exports = router;
