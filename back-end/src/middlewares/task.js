const { TaskSchemas } = require('../schemas');
const { getCustomError } = require('../helpers');

const validateName = (req, _res, next) => {
  const { name } = req.body;
  const { error } = TaskSchemas.name.validate(name);

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};

const validateStatus = (req, _res, next) => {
  const { status } = req.body;
  const { error } = TaskSchemas.status.validate(status);

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};

module.exports = {
  validateName,
  validateStatus,
};
