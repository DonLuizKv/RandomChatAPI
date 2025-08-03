import jwt from "jsonwebtoken";
import { AuthModel } from "../models/auth.model";
// import dotenv from "dotenv";
// dotenv.config();

// const SECRET: string = process.env.JWT_SECRET as string;
// const EXPIRE: string = process.env.JWT_EXPIRATION || "12h";

export const login = async (credentials: { email: string; password: string }) => {
    // errores
    const errors = {
        email: "This email does not exist",
        password: "Invalid password",
    }

    // validacion de errores
    for (const field in credentials) {
        const validateField = AuthModel.EXISTS(field, credentials[field as keyof typeof credentials]);

        console.log(!validateField ? errors[field as keyof typeof errors] : null);
    }

    // validacion de datos

    // creacion de token

    // fin
}

login({
    email:"test@example.com",
    password:"password123"
});

export const register = async (userData: { username: string; email: string; password: string }) => {
    // errores

    // validacion de errores

    // validacion de datos

    // creacion de usuario

    // fin
};