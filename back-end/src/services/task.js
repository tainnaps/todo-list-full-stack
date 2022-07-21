const { Task } = require('../models');
const { getCustomError } = require('../helpers');

const getAll = async (orderBy, direction = 'ASC') => {
  const tasks = orderBy
    ? await Task.findAll({ order: [[orderBy, direction]] })
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

const create = async (taskName) => {
  const createdAt = new Date();
  const status = 'Pending';

  const newTask = await Task.create({ name: taskName, status, createdAt });

  return newTask;
};

const update = async (taskId, taskData) => {
  await getById(taskId);

  await Task.update(taskData, { where: { id: taskId } });
};

const remove = async (taskId) => {
  await getById(taskId);

  await Task.destroy({ where: { id: taskId } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
