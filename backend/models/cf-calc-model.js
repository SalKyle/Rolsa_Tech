// models/cf-calc-model.js
const db = require("../config/db");

db.run(`
  CREATE TABLE IF NOT EXISTS cf_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    diet REAL,
    transport REAL,
    housing REAL,
    consumption REAL,
    total REAL,
    date TEXT NOT NULL
)
`);

const CFModel = {
  saveResult: ({ userId, diet, transport, housing, consumption, total, date }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO cf_results (user_id, diet, transport, housing, consumption, total, date)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, diet, transport, housing, consumption, total, date],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  },

  getByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM cf_results WHERE user_id = ? ORDER BY date ASC`, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};

module.exports = CFModel;
