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

const name = Joi
  .string()
  .min(2)
  .required()
  .empty()
  .label('name');

module.exports = {
  email,
  password,
  name,
};
