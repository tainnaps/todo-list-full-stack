const express = require('express');
const routes = require('./src/routes');
const routes = require('./src/routes/task');

const app = express();

app.use(express.json());

app.use(routes);

app.use('/tasks', routes);

module.exports = app;
