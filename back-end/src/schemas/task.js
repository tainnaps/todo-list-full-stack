const Joi = require('joi');

const taskSchema = Joi.object({
  name: Joi
    .string()
    .required()
    .empty(),
  status: Joi
    .string()
    .required()
    .empty()
    .valid('pendente', 'em andamento', 'pronto'),
});

module.exports = taskSchema;
