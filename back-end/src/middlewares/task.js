const { TaskSchemas } = require('../schemas');

const validateName = (req, _res, next) => {
  const { name } = req.body;
  const { error } = TaskSchemas.name.validate(name);

  if (error) return next(error);

  return next();
};

const validateStatus = (req, _res, next) => {
  const { status } = req.body;
  const { error } = TaskSchemas.status.validate(status);

  if (error) return next(error);

  return next();
};

module.exports = {
  validateName,
  validateStatus,
};
