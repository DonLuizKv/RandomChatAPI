import mysql from "mysql2/promise";
import dotenv from 'dotenv';
import { Print } from "../utils/General";
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
    Print(`- Connected to the ${process.env.DB_NAME} database :)`, {
        color: "green",
        bold: true,
    });
    connection.release();
}).catch((error) => {
    Print(`- Error connecting to the database: ${error}`, {
        color: "red",
        bold: true,
    });
});

export default pool;