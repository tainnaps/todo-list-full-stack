require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Ebytr',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3002,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Ebytr',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3002,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Ebytr',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3002,
  },
};
