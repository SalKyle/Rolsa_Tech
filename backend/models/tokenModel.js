const db = require('../config/db');
const user = require('./userModel')


db.run('DROP TABLE IF EXISTS Tokens', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});

db.run(`
    CREATE TABLE IF NOT EXISTS Tokens (
      otp INTEGER,
      Reset_token TEXT PRIMARY KEY,
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
