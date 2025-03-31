const express = require("express");
const router = express.Router();
const db = require("../config/db");
const EnergyModel = require("../models/EnergyModel");

// GET all energy entries
router.get("/:userId", async (req, res) => {
  try{
    const data = await EnergyModel.getByUser(req.params.userId);
    res.json(data);}
  catch (err) {
    res.status(500).json({ error: "Failed to fetch energy data" });
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
