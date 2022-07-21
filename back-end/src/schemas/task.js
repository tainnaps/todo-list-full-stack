const Joi = require('joi');

const taskNameSchema = Joi.object({
  name: Joi
    .string()
    .required()
    .empty(),
});

const taskStatusSchema = Joi.object({
  status: Joi
    .string()
    .required()
    .empty()
    .valid('Pending', 'In progress', 'Done'),
});

module.exports = {
  taskNameSchema,
  taskStatusSchema,
};
