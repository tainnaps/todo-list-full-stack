const express = require('express');
const routes = require('./src/routes');
const Middlewares = require('./src/middlewares');

const app = express();

app.use(express.json());

app.use(routes);

app.use(Middlewares.handleError);

module.exports = app;
