module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
