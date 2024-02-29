const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../functions/mysql-connection-pool");

// Define a route to get all users except the requester
router.get("/get-all-users", async (req, res) => {
  try {
    const token = req.headers.token;
    const myUsername = jwt.decode(token);

    // Query all users except the requester from the database
    const [rows] = await pool.execute(
      "SELECT id, username, avatarImageSrc, description, title FROM users WHERE username != ?",
      [myUsername.username]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error interacting with the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
