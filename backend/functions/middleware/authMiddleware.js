// verifyToken middleware
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  req.isAuthPage = false;
  // Allow requests to the /sign-up route without a token
  if (
    req.originalUrl === "/create-user" ||
    req.originalUrl === "/auth-user" ||
    req.originalUrl === "/auth"
  ) {
    req.isAuthPage = true;
    return next();
  }

  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
