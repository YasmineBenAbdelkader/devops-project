// server.js
const app = require('./app');
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
