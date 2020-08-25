const app = require('./app');
const DataBase = require('./lib/db');
const { PORT } = require('./config');

// Connect to Database
DataBase.connect();


// Server
const server = app.listen(PORT, () => {
  console.log(`Listen:: http://localhost:${server.address().port}`);
});