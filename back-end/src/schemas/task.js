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
    .valid('pendente', 'em andamento', 'pronto'),
});

module.exports = {
  taskNameSchema,
  taskStatusSchema,
};
