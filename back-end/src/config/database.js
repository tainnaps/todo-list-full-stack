module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: 'TodoList',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
