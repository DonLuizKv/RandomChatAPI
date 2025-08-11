import { AuthModel } from "../models/auth.model";
import { validateField } from "../utils/General";

export const login = async (credentials: { email: string; password: string }) => {
    const errors = {
        email: "This email does not exist",
        password: "Invalid password",
    }

    // validacion de datos
    const db_credentials = await AuthModel.GET_USER_CREDENTIALS(credentials.email);

    if (!db_credentials) {
        throw new Error("This user doesnt exists.");
    }

    for (const key of Object.keys(errors)) {
        
    }

    // creacion de token

    // fin
}

export const register = async (userData: { username: string; email: string; password: string }) => {
    // errores

    // validacion de errores

    // validacion de datos

    // creacion de usuario

    // fin
};