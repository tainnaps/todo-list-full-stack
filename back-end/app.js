const express = require('express');
const routes = require('./src/routes/task');

const app = express();

app.use(express.json());

app.use('/tasks', routes);

module.exports = app;
