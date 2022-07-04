const { Task } = require('../models');

const getAll = async (orderBy, direction) => {
  const orderDirection = direction || 'ASC';

  const tasks = orderBy
    ? await Task.findAll({ order: [[orderBy, orderDirection]] })
    : await Task.findAll();

  return tasks;
};

const create = async (taskData) => {
  const createdAt = new Date();

  const newTask = await Task.create({ ...taskData, createdAt });

  return newTask;
};
module.exports = {
  getAll,
  create,
};
