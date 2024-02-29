const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../functions/mysql-connection-pool");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the username already exists
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      res.json({
        msg: "Username already exists",
        status: 400,
      });
      return;
    }

    // Insert the new user into the database
    await pool.execute(
      "INSERT INTO users (username, password, avatarImageSrc, description, title) VALUES (?, ?, ?, ?, ?)",
      [username, hashedPassword, "", "This is my description", username]
    );

    const newUser = {
      username,
      avatarFallback: username.slice(0, 2),
      avatarImageSrc: "",
      description: "This is my description",
      title: username,
    };

    // Create a JWT token
    const token = jwt.sign({ username }, process.env.SECRET_JWT, {
      expiresIn: "12h",
    });

    console.log("User added successfully:", newUser);
    res.status(200).json({
      msg: "User added successfully!",
      status: 200,
      token,
      data: newUser,
    });
  } catch (error) {
    console.error("Error interacting with the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
