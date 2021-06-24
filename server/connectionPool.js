const mysql = require('mysql');

const pool = mysql.createPool({
    user: process.env['MYSQL_ADDON_USER'],
    password: process.env['MYSQL_ADDON_PASSWORD'],
    host: process.env['MYSQL_ADDON_HOST'],
    database: process.env['MYSQL_ADDON_DB']
  });
  

  module.exports = pool;