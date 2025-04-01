const express = require("express");
const router = express.Router();
const CFModel = require("../models/cf-calc-model");

router.post("/", async (req, res) => {
  const { userId, diet, transport, housing, consumption, total, date } = req.body;

  if (!userId || !date) {
    return res.status(400).json({ error: "Missing user ID or date" });
  }

  try {
    const saved = await CFModel.saveResult({ userId, diet, transport, housing, consumption, total, date });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save carbon data" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const data = await CFModel.getByUser(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch carbon data" });
  }
});

module.exports = router;
