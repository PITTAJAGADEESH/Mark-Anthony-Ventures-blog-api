const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next({ statusCode: 401, message: "Invalid token" });
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};
