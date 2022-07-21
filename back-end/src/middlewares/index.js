const handleError = require('./error');
const taskValidations = require('./task');

module.exports = {
  handleError,
  ...taskValidations,
};
