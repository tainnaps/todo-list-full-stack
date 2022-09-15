const { UserSchemas } = require('../schemas');

const validateEmail = (req, _res, next) => {
  const { email } = req.body;
  const { error } = UserSchemas.email.validate(email);

  if (error) return next(error);

  return next();
};

const validatePassword = (req, _res, next) => {
  const { password } = req.body;
  const { error } = UserSchemas.password.validate(password);

  if (error) return next(error);

  return next();
};

const validateName = (req, _res, next) => {
  const { name } = req.body;
  const { error } = UserSchemas.name.validate(name);

  if (error) return next(error);

  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
