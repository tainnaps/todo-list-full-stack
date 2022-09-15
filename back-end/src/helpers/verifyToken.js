require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (token) => {
  const { payload } = jwt.verify(token, JWT_SECRET);

  return payload;
};

module.exports = verifyToken;
