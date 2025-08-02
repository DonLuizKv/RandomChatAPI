import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Database from '../utils/Database';
import { User } from '../types/User';

// const ALLOWED_FIELDS = ["username", "email", "password"];

const CREATE = async (data: User) => {
    const params = [data.username, data.email, data.password];
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    const [result] = await Database.query<ResultSetHeader>(query, params);
    return result;
};

// const UPDATE = async (id: number, fieldToChange: Record<string, string | number>) => {
//     const keys = Object.keys(fieldToChange).filter(key => ALLOWED_FIELDS.includes(key));

//     if (keys.length === 0) {
//         throw new Error("No valid fields provided for update.");
//     }

//     const fields = keys.map(key => `${key} = ?`).join(", ");
//     const values = keys.map(key => fieldToChange[key]);

//     const query = `UPDATE users SET ${fields} WHERE id = ?`;
//     const [result] = await Database.query<ResultSetHeader>(query, [...values, id]);
//     return result;
// };

const DELETE = async (id: number) => {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await Database.query<ResultSetHeader>(query, [id]);
    return result;
};

const GET = async (id: number) => {
    const query = "SELECT username, email, password FROM users WHERE id = ?";
    const [user] = await Database.query<RowDataPacket[]>(query, [id]);
    return user;
};

const GET_ALL = async () => {
    const query = "SELECT username, email, password FROM users";
    const [users] = await Database.query<RowDataPacket[]>(query);
    return users;
};

export const UserModel = {
    CREATE,
    GET,
    GET_ALL,
    // UPDATE,
    DELETE
};