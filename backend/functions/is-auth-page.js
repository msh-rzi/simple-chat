const isAuthPage = (req, res, next) => {
  const authPages = ["/create-user", "/auth-user", "/auth"];

  // Check if the requested path is an authentication page
  req.isAuthPage = authPages.includes(req.originalUrl);

  next(); // Continue to the next middleware or route handler
};
