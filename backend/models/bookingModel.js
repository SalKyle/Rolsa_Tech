const db = require("../config/db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error('Error creating bookings table:', err.message);
    else console.log('✅ Bookings table created or already exists');
  });
});

const BookingModel = {
  create: ({ userId, service, date, time }) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO bookings (user_id, service, date, time) VALUES (?, ?, ?, ?)",
        [userId, service, date, time],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, userId, service, date, time });
        }
      );
    });
  },

  getByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM bookings WHERE user_id = ? ORDER BY date ASC, time ASC",
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  getBookedSlots: (date, service) => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT time FROM bookings WHERE date = ? AND service = ?",
        [date, service],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },
};

module.exports = BookingModel;
