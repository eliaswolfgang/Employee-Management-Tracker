const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "ivMySQL123!",
  database: "employees"
});

connection.connect();

// Promisify the connection query to use async/await 
connection.query = util.promisify(connection.query);

module.exports = connection;