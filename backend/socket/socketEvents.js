const setupSocketEvents = (io) => {
  // Socket.io connection event
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for chat messages
    socket.on("chatMessage", (message) => {
      io.emit("chatMessage", message); // Broadcast the message to all connected clients
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = setupSocketEvents;
