const { taskNameSchema, taskStatusSchema } = require('../schemas');
const { getCustomError } = require('../helpers');

const validateTaskName = (req, _res, next) => {
  const { name } = req.body;
  const { error } = taskNameSchema.validate({ name });

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};

const validateTaskStatus = (req, _res, next) => {
  const { status } = req.body;
  const { error } = taskStatusSchema.validate({ status });

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};

module.exports = {
  validateTaskName,
  validateTaskStatus,
};
