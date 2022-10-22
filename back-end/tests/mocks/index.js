const TaskMocks = require('./task');
const AuthMocks = require('./auth');
const UserMocks = require('./user');

module.exports = {
  ...TaskMocks,
  ...AuthMocks,
  ...UserMocks,
};
