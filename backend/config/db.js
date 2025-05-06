// config/db.jsconst 
sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./rolsa.db', (err) => {
  if (err) console.error('Failed to connect to DB:', err.message);
  else console.log('SQLite Database connected');
});
module.exports = db;
