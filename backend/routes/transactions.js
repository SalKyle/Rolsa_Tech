// routes/transactions.js
const express = require('express');
const router = express.Router();
const { saveTransaction } = require('../controllers/transactions');

router.post('/', (req, res) => {
  const { items, total, timestamp } = req.body;

  if (!items || !total) return res.status(400).json({ error: 'Missing data' });

  saveTransaction({ items, total, timestamp: timestamp || new Date().toISOString() }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to save transaction' });
    res.status(201).json(result);
  });
});

module.exports = router;
