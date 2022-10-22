const { TOKEN } = require('./auth');

const USER_WITHOUT_PASSWORD = {
  id: 1,
  name: 'First User',
  email: 'first@user.com',
};

const USER_WITH_TOKEN = {
  token: TOKEN,
  user: USER_WITHOUT_PASSWORD,
};

const USER_WITH_PASSWORD = {
  ...USER_WITHOUT_PASSWORD,
  password: 'e10adc3949ba59abbe56e057f20f883e',
};

const INVALID_EMAIL = 'Invalid email';

const INVALID_PASSWORD = '123';

const VALID_PASSWORD = '123456';

const INVALID_NAME = 'a';

module.exports = {
  USER_WITHOUT_PASSWORD,
  USER_WITH_TOKEN,
  USER_WITH_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  VALID_PASSWORD,
  INVALID_NAME,
};
