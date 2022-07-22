const { UserService } = require('../services');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginData = await UserService.login(email, password);

    res.status(200).json(loginData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
