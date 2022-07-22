const router = require('express').Router();
const taskRouter = require('./task');
const userRouter = require('./user');

router.use('/tasks', taskRouter);

router.use('/users', userRouter);

module.exports = router;
