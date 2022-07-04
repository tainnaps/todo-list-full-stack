const router = require('express').Router();
const { TaskController } = require('../controllers');
const Middlewares = require('../middlewares');

router.route('/')
  .get(TaskController.getAll)
  .post(Middlewares.validateTask, TaskController.create);

router.route('/:id')
  .put(Middlewares.validateTask, TaskController.update)

module.exports = router;
