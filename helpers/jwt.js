const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
//* sign token
const signToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

//* verify token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { signToken, verifyToken };