import { ResultSetHeader, RowDataPacket } from "mysql2";
import Database from "../utils/Database";

const ALLOWED_FIELDS = ['email', 'username', 'id'];

const EXISTS = async (field: string, value: string) => {

    if (!ALLOWED_FIELDS.includes(field)) {
        throw new Error(`Field ${field} is not allowed`);
    }

    const query = `SELECT ${field} FROM users WHERE ${field} = ?`;
    const [result] = await Database.query<ResultSetHeader>(query, [value]);
    return result.affectedRows > 0;
};

const TWO_FACTOR_AUTH = async (userId: number) => {

};

export const AuthModel = {
    EXISTS,
}
