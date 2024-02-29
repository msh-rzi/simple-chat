const express = require("express");
const router = express.Router();
const pool = require("../functions/mysql-connection-pool");

// Define a route to update the user with the provided schema
router.put("/", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    // Construct the SET clause dynamically based on the request body
    const setClause = Object.keys(req.body)
      .map((key) => `${key} = ?`)
      .join(", ");

    // Prepare the update query
    const updateQuery = `UPDATE users SET ${setClause} WHERE username = ?`;

    // Extract values from the request body
    const values = [...Object.values(req.body), username];

    // Execute the update query
    await pool.execute(updateQuery, values);

    res.status(200).json({ msg: "User updated successfully", status: 200 });
  } catch (error) {
    console.error("Error interacting with the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
