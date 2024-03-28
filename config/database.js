// const Sequelize = require('sequelize');
const mysql = require('mysql2');

const DB_HOST = process.env.DB_HOST
const DB_DATABASE = process.env.DB_DATABASE
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD


// const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
//   dialect: 'mysql',
//   host: DB_HOST
// });
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE
});



// module.exports = sequelize;
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;