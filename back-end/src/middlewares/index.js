const errorMiddleware = require('./error');
const TaskMiddlewares = require('./task');
const UserMiddlewares = require('./user');

module.exports = {
  errorMiddleware,
  TaskMiddlewares,
  UserMiddlewares,
};
