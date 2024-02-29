const express = require("express");
const findUserByUsername = require("../functions/find-user-by-username");
const pool = require("../functions/mysql-connection-pool");
const router = express.Router();

router.post("/", async (req, res) => {
  const { id, username } = req.body;

  try {
    const [results] = await pool.query(
      "SELECT * FROM rooms WHERE owner = ? OR guest = ?",
      [id, id]
    );

    const rooms = [];

    // Use Promise.all to handle asynchronous operations
    await Promise.all(
      results.map(async (row) => {
        let users = row.id.split("-");

        users = users.filter((u) => u !== username);

        await Promise.all(
          users.map(async (u) => {
            const userData = await findUserByUsername(u);
            const isPushed = rooms.find((l) => l.id === userData.id);
            if (!isPushed) rooms.push(userData);
          })
        );
      })
    );

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error getting user rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
