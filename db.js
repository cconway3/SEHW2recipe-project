const mysql = require('mysql2');
require('dotenv').config();
console.log(process.env.DB_HOST);

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'recipe',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
