import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
}

const pool = mysql.createPool(config);

pool.getConnection().then((connection) => {
    console.log("\x1b[32m\x1b[1m- Connected to the database successfully\x1b[0m");
    connection.release();
}).catch((error) => {
    console.log("\x1b[31m\x1b[1m- Error connecting to the database\x1b[0m", error);
});

export default pool;