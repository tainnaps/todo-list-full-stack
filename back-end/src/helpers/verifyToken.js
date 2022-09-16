const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (token) => {
  const { userId } = jwt.verify(token, JWT_SECRET);

  return userId;
};

module.exports = verifyToken;
