import jwt from "jsonwebtoken";
import { AuthModel } from "../models/auth.model";
import { Compare, Hash, validateField } from "../utils/General";
import { TokenPayload } from "../types/Auth";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

export const login_service = async (email: string, password: string) => {

    // validacion de datos
    const db_credentials = await AuthModel.GET_USER_CREDENTIALS(email);

    if (!db_credentials) {
        throw new Error("This user doesnt exist.");
    }

    const Match_Password = await Compare(password, db_credentials.password);

    if (!Match_Password) {
        throw new Error("Invalid password.");
    }

    // Creacion del token
    const payload: TokenPayload = {
        id: db_credentials.id,
        username: db_credentials.username,
        email: db_credentials.email
    }

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES as jwt.SignOptions["expiresIn"] }
    );

    // fin
    return {
        token,
        user: payload
    };
}

export const register_service = async (userData: { username: string; email: string; password: string }) => {
    // errores

    // validacion de errores

    // validacion de datos

    // creacion de usuario

    // fin
};