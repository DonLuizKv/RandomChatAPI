import { RowDataPacket } from "mysql2";
import Database from "../utils/Database";

const ALLOWED_FIELDS = ['email', 'username', 'id'];

const GET_USER_CREDENTIALS = async (email: string) => {
    const query = `SELECT id, username, email, password FROM users WHERE email = ? LIMIT 1`;
    const [credentials] = await Database.query<RowDataPacket[]>(query, [email]);
    return credentials[0] || null;
};

const TWO_FACTOR_AUTH = async (userId: number) => {

};

export const AuthModel = {
    GET_USER_CREDENTIALS,
    TWO_FACTOR_AUTH
};
