const express = require('express');
const routes = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

module.exports = app;
