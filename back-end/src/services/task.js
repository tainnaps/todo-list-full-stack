const { Task } = require('../models');
const { getCustomError } = require('../helpers');

const getAll = async ({ orderBy, direction = 'ASC' }) => {
  const tasks = orderBy
    ? await Task.findAll({ order: [[orderBy, direction]] })
    : await Task.findAll();

  return tasks;
};

const getById = async (id) => {
  const foundTask = await Task.findByPk(id);

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
  await getById(id);

  await Task.update({ name, status }, { where: { id, userId } });
};

const remove = async ({ id, userId }) => {
  await getById(id);

  await Task.destroy({ where: { id, userId } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
