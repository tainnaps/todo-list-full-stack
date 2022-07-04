const { Task } = require('../models');
const { getCustomError } = require('../helpers');

const getAll = async (orderBy, direction) => {
  const orderDirection = direction || 'ASC';

  const tasks = orderBy
    ? await Task.findAll({ order: [[orderBy, orderDirection]] })
    : await Task.findAll();

  return tasks;
};

const getById = async (taskId) => {
  const foundTask = await Task.findByPk(taskId);

  if (!foundTask) {
    const customError = getCustomError('Task not found', 404);
    throw customError;
  }

  return foundTask;
};

const create = async (taskData) => {
  const createdAt = new Date();

  const newTask = await Task.create({ ...taskData, createdAt });

  return newTask;
};

const update = async (taskId, taskData) => {
  const foundTask = await getById(taskId);

  await foundTask.update(taskData);
};

const remove = async (taskId) => {
  const foundTask = await getById(taskId);

  await foundTask.destroy();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
