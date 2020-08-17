const app = require('./app');
const DataBase = require('./lib/db');
const { config } = require('./config');

// Connect to Database
DataBase.connect();


// Server
const server = app.listen(config.puerto, () => {
  console.log(`Listen http://localhost:${server.address().port}`);
});