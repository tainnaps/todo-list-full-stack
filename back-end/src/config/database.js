require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  },
};
