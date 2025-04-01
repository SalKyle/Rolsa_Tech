// config/initDB.js
const db = require('./db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      timestamp TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error("❌ Error creating transactions table:", err.message);
    } else {
      console.log("✅ Transactions table ready.");
    }
  });
});
