const { Task } = require('../models');
const { getCustomError } = require('../helpers');

const getAll = async (userId) => {
  const tasks = await Task.findAll({ where: { userId } });

  return tasks;
};

const getById = async ({ id, userId }) => {
  const foundTask = await Task.findOne({ where: { id, userId } });

  if (!foundTask) {
    const customError = getCustomError('Task not found', 404);
    throw customError;
  }

  return foundTask;
};

const create = async ({ name, userId }) => {
  const createdAt = new Date();
  const status = 'Pending';

  const newTask = await Task.create({ name, status, createdAt, userId });

  return newTask;
};

const update = async ({ id, name, status, userId }) => {
  await getById({ id, userId });

  await Task.update({ name, status }, { where: { id, userId } });
};

const remove = async ({ id, userId }) => {
  await getById({ id, userId });

  await Task.destroy({ where: { id, userId } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
