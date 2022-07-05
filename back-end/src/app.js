const express = require('express');
const routes = require('./routes');
const Middlewares = require('./middlewares');

const app = express();

app.use(express.json());

app.use(routes);

app.use(Middlewares.handleError);

module.exports = app;
