const { Task } = require('../models');

const getAll = async (orderBy, direction) => {
  const orderDirection = direction || 'ASC';

  const tasks = orderBy
    ? await Task.findAll({ order: [[orderBy, orderDirection]] })
    : await Task.findAll();

  return tasks;
};

module.exports = {
  getAll,
};
