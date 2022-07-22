const md5 = require('md5');
const { User } = require('../models');
const { getCustomError, generateToken } = require('../helpers');

const login = async ({ email, password }) => {
  const passwordHash = md5(password);

  const user = await User.findOne({
    where: { email, password: passwordHash },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const customError = getCustomError('User not found', 404);
    throw customError;
  }

  const token = generateToken(email);

  return {
    token,
    user,
  };
};

const create = async ({ email, password, name }) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const customError = getCustomError('Email already registered', 409);
    throw customError;
  }

  const passwordHash = md5(password);
  const newUser = await User.create({ email, password: passwordHash, name });
  const token = generateToken(email);

  return {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

module.exports = {
  login,
  create,
};
