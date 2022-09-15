const { UserService } = require('../services');
const { getCustomError, verifyToken } = require('../helpers');

const authMiddleware = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      const customError = getCustomError('Token not found', 401);
      throw customError;
    }

    const userId = verifyToken(token);
    const user = await UserService.getById(userId);

    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
