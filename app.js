const app = require('./server');
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Access page at http://localhost:${PORT}`);
});
