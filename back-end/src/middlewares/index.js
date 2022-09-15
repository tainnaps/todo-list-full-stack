const authMiddleware = require('./auth');
const errorMiddleware = require('./error');
const TaskMiddlewares = require('./task');
const UserMiddlewares = require('./user');

module.exports = {
  errorMiddleware,
  authMiddleware,
  TaskMiddlewares,
  UserMiddlewares,
};
