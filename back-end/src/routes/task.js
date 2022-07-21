const router = require('express').Router();
const { TaskController } = require('../controllers');
const Middlewares = require('../middlewares');

router.route('/')
  .get(TaskController.getAll)
  .post(
    Middlewares.validateTaskName,
    TaskController.create,
  );

router.route('/:id')
  .put(
    Middlewares.validateTaskName,
    Middlewares.validateTaskStatus,
    TaskController.update,
  )
  .delete(TaskController.remove);

module.exports = router;
