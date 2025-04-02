// routes/user.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ UPDATE user info
router.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const fields = [];
  const values = [];

  if (name) {
    fields.push("name = ?");
    values.push(name);
  }

  if (email) {
    fields.push("email = ?");
    values.push(email);
  }

  if (password) {
    fields.push("password = ?");
    values.push(password);
  }

  values.push(id); // For WHERE clause

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update." });
  }

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ message: "Failed to update user", error: err.message });
    }
    res.json({ message: "User updated successfully", changes: this.changes });
  });
});

module.exports = router;
