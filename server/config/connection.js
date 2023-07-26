const Sequelize = require('sequelize');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log("This is the process.env.MYSQL_URL variable", process.env.MYSQL_URL)

const sequelize = process.env.MYSQL_URL
  ? new Sequelize(process.env.MYSQL_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    });

module.exports = sequelize;

