require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (userId) => {
  const token = jwt.sign(
    { payload: { userId } },
    JWT_SECRET,
    { expiresIn: '1d' },
  );

  return token;
};

module.exports = generateToken;
