require('dotenv').config();

const config = {
  puerto: process.env.APP_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET
}

module.exports = { config }