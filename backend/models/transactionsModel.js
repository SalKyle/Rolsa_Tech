const db = require('../config/db');
const user = require('./userModel')


db.run('DROP TABLE IF EXISTS transactions', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});

db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      No_of_products INTEGER,
      Total_price REAL,
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
