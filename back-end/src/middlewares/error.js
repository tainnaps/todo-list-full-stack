// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  const { code, message } = err;

  if (code) {
    return res.status(code).json({ message });
  }

  console.log(message);

  return res.status(500).json({ message: 'Internal server error' });
};
