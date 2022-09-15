const errorMiddleware = (err, _req, res, _next) => {
  if (err.code) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }

  const isJwtError = ['token', 'jwt'].some((word) => err.message.includes(word));

  if (isJwtError) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (err.isJoi) {
    const [{ message }] = err.details;
    return res.status(400).json({ message });
  }

  console.log(err.message);

  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorMiddleware;
