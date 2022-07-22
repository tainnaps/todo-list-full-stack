require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (email) => {
  const token = jwt.sign(
    { payload: { email } },
    JWT_SECRET,
    { expiresIn: '1d' },
  );

  return token;
};

module.exports = generateToken;
