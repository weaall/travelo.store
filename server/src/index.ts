import mysql from "mysql2";
import dotenv from "dotenv";
import Express, { Response } from "express";

dotenv.config();
const cors = require("cors");

const app = Express();
const port = process.env.PORT;
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

const connection = mysql.createConnection({ uri: process.env.DATABASE_URL });

app.use("/api/v1", (req, res: Response) => {
    console.log("고객데이터 조회");
    connection.query("Select * from department", function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});

// connection.query("SHOW TABLES", function (err, results, fields) {
//     if (err) throw err;
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra metadata about results, if available
// });

connection.query("Select * from department", function (err, results, fields) {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
});

app.listen(port, () => {
    console.log(`localhost:${port} connected`);
});
