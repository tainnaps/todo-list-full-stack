const { taskSchema } = require('../schemas');
const { getCustomError } = require('../helpers');

module.exports = (req, _res, next) => {
  const { name, status } = req.body;
  const { error } = taskSchema.validate({ name, status });

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};
