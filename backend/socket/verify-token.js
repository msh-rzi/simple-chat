const jwt = require("jsonwebtoken");
function verifyToken(socket, next) {
  const token = socket.handshake.query.token;

  console.log(token);

  if (!token) {
    socket.close();
    return next(new Error("Unauthorized: No token provided"));
  } else {
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        console.log(err);
        return next(new Error("Unauthorized: Invalid token"));
      }
      socket.decoded = decoded;
      next();
    });
  }
}

module.exports = verifyToken;
