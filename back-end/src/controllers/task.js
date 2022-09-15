const { TaskService } = require('../services');

const getAll = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const tasks = await TaskService.getAll(userId);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id: userId } = req.user;

    const newTask = await TaskService.create({ name, userId });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const { id: userId } = req.user;

    await TaskService.update({
      id, name, status, userId,
    });

    res.status(200).json({ message: 'Task succesfully updated' });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    await TaskService.remove({ id, userId });

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
