const router = require('express').Router();
const taskRoutes = require('./task');

router.use('/tasks', taskRoutes);

module.exports = router;
