const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../functions/mysql-connection-pool");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user data from the database
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, rows[0].password);

      if (passwordMatch) {
        // Create a user token
        const token = jwt.sign({ username }, process.env.SECRET_JWT, {
          expiresIn: "12h",
        });

        // Remove password from the user data
        const user = { ...rows[0] };
        delete user.password;

        res.status(200).json({
          status: 200,
          msg: "Logging in",
          token,
          data: user,
        });
      } else {
        res.status(401).json({ msg: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ msg: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error interacting with the database:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
