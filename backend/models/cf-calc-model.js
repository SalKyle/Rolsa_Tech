const db = require('../config/db');
const user = require('./userModel')


db.run('DROP TABLE IF EXISTS cf_calc', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});

db.run(`
    CREATE TABLE IF NOT EXISTS cf_calc (
      Cf_score_id INTEGER PRIMARY KEY AUTOINCREMENT,
      Cf_score REAL,
      Date_of_calc TEXT,
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
