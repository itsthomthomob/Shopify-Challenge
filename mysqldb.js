// Author: Thomas O'Brien
// Purpose: Set up connection details for the MySQL backend, provided by Drury University.
// Special thanks to Dr. Sigman for allowing me to use the MySQL server for the Shopify Intern Challenge
// 
// Modification Log
// 
// 05-17: server.js created
// 05-19: Changed port to 3001
// 

const mysql = require("mysql");
const config = require("./Config/MySQL.json");

var conn = mysql.createConnection ( {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = conn;