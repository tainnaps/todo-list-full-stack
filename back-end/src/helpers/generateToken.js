const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (userId) => {
  const token = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  return token;
};

module.exports = generateToken;
