const db = require("../config/db");


db.serialize(() => {
  // db.run('DROP TABLE IF EXISTS users', (err) => {
  //   if (err) console.error('Error dropping table:', err);
  //   else console.log('Table dropped');
  // });

  db.run(`
    CREATE TABLE IF NOT EXISTS energy_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usage INTEGER NOT NULL,
      date TEXT NOT NULL,
      user_id INTEGER
    );


  `, (err) => {
    if (err) console.error('Error creating table:', err.message);
    else console.log('Energy Table created or already exists');
  });
});

const EnergyModel = {
  getAllEntries: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM energy_entries ORDER BY date ASC", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addEntry: ({ usage, date, userId }) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO energy_entries (usage, date, user_id) VALUES (?, ?, ?)",
        [usage, date, userId || null],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, usage, date, userId });
        }
      );
    });
  },


  getByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM energy_entries WHERE user_id = ? ORDER BY date ASC",
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
};


module.exports = EnergyModel;
