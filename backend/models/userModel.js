
const db = require('../config/db'); // 

db.serialize(() => {
  // db.run('DROP TABLE IF EXISTS users', (err) => {
  //   if (err) console.error('Error dropping table:', err);
  //   else console.log('Table dropped');
  // });

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating table:', err.message);
    else console.log('Table created or already exists');
  });
});
