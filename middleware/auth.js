const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "SECRETKEY";

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.json({ message: "LOGIN FIRST" });
    return res.redirect("/");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.redirect("/");
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
