const db = require('../config/db');
const user = require('./userModel')


db.run('DROP TABLE IF EXISTS energy_usage', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});

db.run(`
    CREATE TABLE IF NOT EXISTS energy_usage (
      energy_usage_id INTEGER PRIMARY KEY AUTOINCREMENT,
      energy_usage REAL,
      date_of_check TEXT,
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
