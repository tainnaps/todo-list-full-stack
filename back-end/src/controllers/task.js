const { TaskService } = require('../services');

const getAll = async (req, res, next) => {
  try {
    const { orderBy, direction } = req.query;

    const tasks = await TaskService.getAll(orderBy, direction);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newTask = await TaskService.create(name);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    await TaskService.update(id, { name, status });

    res.status(200).json({ message: 'Task succesfully updated' });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await TaskService.remove(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
