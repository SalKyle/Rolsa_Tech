
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { items, total, timestamp } = req.body;
  const stmt = db.prepare('INSERT INTO transactions (items, total, timestamp) VALUES (?, ?, ?)');
  stmt.run(JSON.stringify(items), total, timestamp, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Transaction saved' });
  });
});

module.exports = router;
