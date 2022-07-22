const router = require('express').Router();
const { TaskController } = require('../controllers');
const { TaskMiddlewares } = require('../middlewares');

router.route('/')
  .get(TaskController.getAll)
  .post(
    TaskMiddlewares.validateName,
    TaskController.create,
  );

router.route('/:id')
  .put(
    TaskMiddlewares.validateName,
    TaskMiddlewares.validateStatus,
    TaskController.update,
  )
  .delete(TaskController.remove);

module.exports = router;
