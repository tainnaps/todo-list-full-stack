const router = require('express').Router();
const { UserController } = require('../controllers');
const { UserMiddlewares } = require('../middlewares');

router.post(
  '/login',
  UserMiddlewares.validateEmail,
  UserMiddlewares.validatePassword,
  UserController.login,
);

module.exports = router;
