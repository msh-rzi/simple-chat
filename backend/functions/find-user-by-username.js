const pool = require("./mysql-connection-pool");
// Function to find a user by username
const findUserByUsername = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows, fields] = await pool.query(query, [username]);

    if (rows.length > 0) {
      const foundUser = rows[0];
      // Exclude sensitive information (e.g., password) before returning the user
      delete foundUser.password;
      return foundUser;
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return null;
  }
};

module.exports = findUserByUsername;
