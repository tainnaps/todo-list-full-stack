const router = require('express').Router();
const { TaskController } = require('../controllers');
const { TaskMiddlewares, authMiddleware } = require('../middlewares');

router.route('/')
  .get(
    authMiddleware,
    TaskController.getAll,
  )
  .post(
    authMiddleware,
    TaskMiddlewares.validateName,
    TaskController.create,
  );

router.route('/:id')
  .put(
    authMiddleware,
    TaskMiddlewares.validateName,
    TaskMiddlewares.validateStatus,
    TaskController.update,
  )
  .delete(
    authMiddleware,
    TaskController.remove,
  );

module.exports = router;
