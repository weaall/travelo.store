import mysql from "mysql2";
import dotenv from "dotenv";
import { DefaultDeserializer } from "v8";

dotenv.config();

// Create the connection to the database
const connection = mysql.createConnection({ uri: process.env.DB_URL });

// Simple query
connection.query("SHOW TABLES", function (err, results, fields) {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra metadata about results, if available
});

// Example with placeholders
connection.query("SELECT 1 FROM dual WHERE ? = ?", [1, 1], function (err, results) {
    if (err) throw err;
    console.log(results);
});

connection.end();
