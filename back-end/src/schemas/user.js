const Joi = require('joi');

const email = Joi
  .string()
  .email()
  .required()
  .empty()
  .label('email');

const password = Joi
  .string()
  .min(6)
  .required()
  .empty()
  .label('password');

module.exports = {
  email,
  password,
};
