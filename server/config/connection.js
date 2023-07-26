const Sequelize = require('sequelize');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// const sequelize = process.env.MYSQL_URL
//   ? new Sequelize(process.env.MYSQL_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306,
//       logging: false
//     });

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
  });


module.exports = sequelize;

