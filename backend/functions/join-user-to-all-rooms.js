const pool = require("./mysql-connection-pool");

const joinUserToRooms = async (socket, user) => {
  try {
    // Query to get all rooms associated with the user
    const query =
      "SELECT id,guest,owner FROM rooms WHERE owner = ? OR guest = ?";
    const [results] = await pool.query(query, [user, user]);

    // Join the user to each room
    results.forEach((row) => {
      if (row.owner === user.id || row.guest === row.id) return;
      const roomName = row.id;
      console.log("roomName", roomName);
      socket.join(roomName);
    });
  } catch (error) {
    console.error("Error joining user to rooms:", error);
  }
};

module.exports = joinUserToRooms;
