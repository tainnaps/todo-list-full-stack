const { UserService } = require('../services');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginData = await UserService.login({ email, password });

    res.status(200).json(loginData);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const creationData = await UserService.create({ email, password, name });

    res.status(201).json(creationData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  create,
};
