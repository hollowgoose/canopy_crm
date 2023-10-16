const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "canopycrm",
  timezone: "+01:00",
  connectionLimit: 10,
});

module.exports = db;
