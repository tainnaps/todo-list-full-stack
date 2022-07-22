const md5 = require('md5');
const { User } = require('../models');
const { getCustomError, generateToken } = require('../helpers');

const login = async (email, password) => {
  const passwordHash = md5(password);

  const user = await User.findOne({
    where: { email, password: passwordHash },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const customError = getCustomError('User not found', 404);
    throw customError;
  }

  const token = generateToken(user.id);

  return { token, user };
};

module.exports = {
  login,
};
