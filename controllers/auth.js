const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../data/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, occupation } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const [result] = await pool.query(
        "INSERT INTO users (firstName, lastName, email, password, location, occupation) VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword, location, occupation]
      );
      res.json({ userId: result.insertId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      const user = rows[0];

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          JSON.stringify(user.id),
          process.env.JWT_SECRET
        );
        delete user.password;
        res.status(200).json({ token, user });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
