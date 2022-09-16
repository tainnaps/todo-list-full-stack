const app = require('./app');

const PORT = process.env.SERVER_PORT || 3010;

app.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`);
});
