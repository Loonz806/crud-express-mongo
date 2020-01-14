// config.js
const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT
};
