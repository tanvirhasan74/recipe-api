// db.js
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'ohunm00fjsjs1uzy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'utbqxkw5waiohehf',
  password: 'brep1afyzo9jlvdd',
  database: 'f8p3u3sbnrl848jd'
});

module.exports = pool;
