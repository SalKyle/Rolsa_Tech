const express = require("express");
const router = express.Router();

let energyEntries = []; // Replace with DB if needed

router.get("/", (req, res) => {
  res.json(energyEntries);
});

router.post("/", (req, res) => {
  const { usage, date } = req.body;
  if (!usage || !date) {
    return res.status(400).json({ error: "Missing usage or date" });
  }

  const newEntry = { usage, date };
  energyEntries.push(newEntry);
  res.status(201).json(newEntry);
});

module.exports = router;
