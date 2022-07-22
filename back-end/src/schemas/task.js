const Joi = require('joi');

const name = Joi
  .string()
  .required()
  .empty()
  .label('name');

const status = Joi
  .string()
  .required()
  .empty()
  .valid('Pending', 'In progress', 'Done')
  .label('status');

module.exports = {
  name,
  status,
};
