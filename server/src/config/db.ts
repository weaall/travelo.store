import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    queueLimit: 10,
});

export default pool;
