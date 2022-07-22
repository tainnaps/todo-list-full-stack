const router = require('express').Router();
const { UserController } = require('../controllers');
const { UserMiddlewares } = require('../middlewares');

router.post(
  '/login',
  UserMiddlewares.validateEmail,
  UserMiddlewares.validatePassword,
  UserController.login,
);

router.post(
  '/',
  UserMiddlewares.validateEmail,
  UserMiddlewares.validatePassword,
  UserMiddlewares.validateName,
  UserController.create,
);

module.exports = router;
