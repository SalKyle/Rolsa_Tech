const db = require('../config/db');
// const users = require('./userModel')


db.run('DROP TABLE IF EXISTS bookings', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});

db.run(`
   CREATE TABLE IF NOT EXISTS bookings (
      Booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
      Booking_type TEXT,
      Booking_date TEXT,
      User_ID INTEGER,
      FOREIGN KEY (User_ID) REFERENCES users(User_ID)
    )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists');
  }
});
