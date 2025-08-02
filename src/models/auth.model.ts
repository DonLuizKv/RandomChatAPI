import { RowDataPacket } from "mysql2";
import Database from "../utils/Database";

const EXISTS = async (email: string): Promise<boolean> => {
    const query = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    const [result] = await Database.query<RowDataPacket[]>(query, [email]);
    return result[0].count > 0;
};

const TWO_FACTOR_AUTH = async (userId: number) => {

};


