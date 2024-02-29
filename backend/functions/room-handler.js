const uuid = require("uuid");
const pool = require("../functions/mysql-connection-pool");
const findUserByUsername = require("./find-user-by-username");

// Function to handle private messages and room management
const handlePrivateMessage = (io, socket, user) => {
  socket.on("private_message", async ({ targetUserId, message, myId }) => {
    const targetUserData = await findUserByUsername(targetUserId);

    if (!targetUserData) {
      console.log("Target user not found");
      return;
    }

    // Sort the user IDs to ensure consistency when creating the room name
    const roomName = roomNameGenerator(user.username, targetUserData.username);
    console.log(roomName);

    // Check if the room already exists check me as owner or guest
    const roomExists = await checkRoomExistence(user.id, targetUserData.id);

    if (!roomExists) {
      // If the room doesn't exist, create it and store the room info
      await createRoom(roomName, user.id, targetUserData.id);

      // Join the users to the room
      socket.join(roomName);
      io.to(roomName).emit("user-room", "User joined!");
    }

    // Emit the private message to the specific room
    io.to(roomName).emit("private_message", {
      senderId: user.username,
      targetUserId,
      message,
      timestamp: new Date(),
      id: uuid.v4(),
      roomId: roomName,
    });

    console.log("object");
    // Insert the message into the database
    await insertMessage(
      uuid.v4(),
      message,
      user.id,
      targetUserData.id,
      new Date(),
      roomName,
      user.username,
      targetUserData.username
    );
  });
};

const insertMessage = async (
  id,
  content,
  senderId,
  targetId,
  timestamp,
  roomId,
  senderUsername,
  targetUsername
) => {
  try {
    const query =
      "INSERT INTO messages (id, content, senderId, targetId, timestamp,roomId,senderUsername,targetUsername) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await pool.query(query, [
      id,
      content,
      senderId,
      targetId,
      timestamp,
      roomId,
      senderUsername,
      targetUsername,
    ]);
  } catch (error) {
    console.error("Error inserting message into the database:", error);
    throw error;
  }
};

// Function to check if a room already exists in the database
const checkRoomExistence = async (user, target) => {
  console.log("Checking room existence");

  try {
    // Check if a room exists where user is the owner and target is the guest, or user is the guest and target is the owner
    const query =
      "SELECT * FROM rooms WHERE (owner = ? AND guest = ?) OR (owner = ? AND guest = ?)";
    const [result] = await pool.query(query, [user, target, target, user]);

    console.log(result);

    // Check if there are any rows returned
    return result.length > 0 ? result : null;
  } catch (error) {
    console.error("Error checking room existence:", error);
    return false; // Assume room doesn't exist in case of an error
  }
};

// Function to create room names
function roomNameGenerator(user1, user2) {
  // Sort the parameters alphabetically
  const sortedParams = [user1, user2].sort();

  // Concatenate the sorted parameters into a string
  const result = `${sortedParams[0]}-${sortedParams[1]}`;

  return result;
}

// Function to create a room in the database
const createRoom = async (id, owner, guest) => {
  const query = "INSERT INTO rooms (id, guest, owner) VALUES (?, ?, ?)";
  const [result] = await pool.query(query, [id, owner, guest]);
  console.log(result);
};

module.exports = {
  handlePrivateMessage,
};
