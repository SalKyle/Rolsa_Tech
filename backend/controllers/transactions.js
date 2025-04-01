// controllers/transactions.js
const db = require('../config/db');

function saveTransaction({ items, total, timestamp }, callback) {
  const query = `INSERT INTO transactions (items, total, timestamp) VALUES (?, ?, ?)`;
  const params = [JSON.stringify(items), total, timestamp];

  db.run(query, params, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, items, total, timestamp });
  });
}

module.exports = { saveTransaction };
