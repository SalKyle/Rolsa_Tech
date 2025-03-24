const db = require('../config/db');
const user = require('./userModel')


db.run('DROP TABLE IF EXISTS products', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    Product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    Product_Name TEXT,
    Product_type TEXT,
    Product_price REAL
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists');
  }
});
