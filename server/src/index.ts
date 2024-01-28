import mysql from "mysql2";
import dotenv from "dotenv";
import Express, { Response } from "express";
import router from "./routes";

dotenv.config();
const cors = require("cors");

const app = Express();
const port = process.env.PORT;
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

app.use("/api", router)

app.listen(port, () => {
    console.log(`localhost:${port} connected`);
});
