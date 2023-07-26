const Sequelize = require('sequelize');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = process.env.RAILWAY_MYSQL_URL
  ? new Sequelize(process.env.RAILWAY_MYSQL_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: console.log
    });



module.exports = sequelize;

