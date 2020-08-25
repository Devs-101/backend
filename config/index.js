require('dotenv').config();

const config = {
  APP_PORT: process.env.APP_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWD: process.env.DB_PASSWD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
}

module.exports = config