const TaskService = require('../services/task');

const getAll = async (req, res, next) => {
  try {
    const { orderBy, direction } = req.query;

    const tasks = await TaskService.getAll(orderBy, direction);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
