const { UserSchemas } = require('../schemas');
const { getCustomError } = require('../helpers');

const validateEmail = (req, _res, next) => {
  const { email } = req.body;
  const { error } = UserSchemas.email.validate(email);

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};

const validatePassword = (req, _res, next) => {
  const { password } = req.body;
  const { error } = UserSchemas.password.validate(password);

  if (error) {
    const { message } = error.details[0];
    const customError = getCustomError(message, 400);

    return next(customError);
  }

  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
