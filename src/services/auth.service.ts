import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/Auth";
import dotenv from "dotenv";
import { Compare } from "../utils/Password";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_TIME = process.env.JWT_EXPIRES as jwt.SignOptions["expiresIn"];

export const login_service = async (email: string, password: string) => {

    // validacion de datos
    // const db_credentials = await AuthModel.GET_USER_CREDENTIALS(email);

    // if (!db_credentials) {
    //     throw new Error("This user doesnt exist.");
    // }

    // const Match_Password = await Compare(password, db_credentials.password);

    // if (!Match_Password) {
    //     throw new Error("Invalid password.");
    // }

    // // Creacion del token
    // const payload: TokenPayload = {
    //     id: db_credentials.id,
    //     username: db_credentials.username,
    //     email: db_credentials.email
    // }

    // const token = jwt.sign(
    //     payload,
    //     JWT_SECRET,
    //     { expiresIn: JWT_EXPIRES_TIME }
    // );

    // // fin
    // return {
    //     token,
    // };
}

export const register_service = async (userData: { username: string; email: string; password: string }) => {
    // errores

    // validacion de errores

    // validacion de datos

    // creacion de usuario

    // fin
};