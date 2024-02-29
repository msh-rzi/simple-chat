const express = require("express");
const pool = require("../functions/mysql-connection-pool");

const router = express.Router();

router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    // Query to get messages for the specified room
    const messagesQuery = "SELECT * FROM messages WHERE roomId = ?";
    const [messagesResults] = await pool.query(messagesQuery, [roomId]);

    res.json(messagesResults);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
