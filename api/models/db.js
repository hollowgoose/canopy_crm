const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "canopycrm",
  connectionLimit: 10,
});

module.exports = db;
