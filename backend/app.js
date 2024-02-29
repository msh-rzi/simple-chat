const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const createUser = require("./routes/create-user");
const authUser = require("./routes/auth");
const contacts = require("./routes/contacts");
const verifyToken = require("./functions/middleware/authMiddleware");
const socketVerifyToken = require("./socket/verify-token");
const updateUser = require("./routes/update-user");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { handlePrivateMessage } = require("./functions/room-handler");
const joinUserToRooms = require("./functions/join-user-to-all-rooms");
const findUserByUsername = require("./functions/find-user-by-username");
const getRoomsByUser = require("./routes/get-rooms-by-user");
const getMessagesByRoomId = require("./routes/get-messages");

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(verifyToken);

app.use("/auth-user", authUser);
app.use("/create-user", createUser);
app.use("/contacts", contacts);
app.use("/update-user", updateUser);
app.use("/get-rooms", getRoomsByUser);
app.use("/get-messages", getMessagesByRoomId);

io.use((socket, next) => {
  socketVerifyToken(socket, next);
});

io.on("connection", async (socket) => {
  io.emit("is-online", {
    username: socket.decoded.username,
    isOnline: true,
  });
  const user = await findUserByUsername(socket.decoded.username);
  joinUserToRooms(socket, user.id);
  handlePrivateMessage(io, socket, user);
  // console.log("A user connected");
  // console.log(socket.id);
  // socket.join("global");

  // socket.on("private_message", ({ targetUserId, message }) => {
  //   io.to("global").emit("global:message", message);

  //   const targetUserData = findUserByUsername(targetUserId);
  //   delete targetUserData.password;
  //   socket.emit("private_message", {
  //     senderId: user.username,
  //     targetUserId,
  //     message,
  //     timestamp: new Date(),
  //     id: uuid.v4(), // message id
  //     user: targetUserData,
  //   });
  // });

  // socket.on("join-room", (room) => {
  //   socket.join("");
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    io.emit("is-online", {
      username: socket.decoded.username,
      isOnline: false,
    });
  });
});
io.on("connect_error", function (err) {
  // handle server error here
  console.log("Error connecting to server");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
