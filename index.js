const app = require('./app');
const DataBase = require('./lib/db');
const { APP_PORT } = require('./config');

// Connect to Database
DataBase.connect();


// Server
const server = app.listen(APP_PORT || '0.0.0.0', () => {
  console.log(`Listen:: http://localhost:${server.address().port}`);
});