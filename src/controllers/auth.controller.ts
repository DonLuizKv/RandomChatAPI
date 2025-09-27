import { Request, Response } from "express";
import { login_service, register_service } from "../services/auth.service";

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        // const { token } = 
        await login_service(email, password);

        res.cookie("token", "token", {
            httpOnly: true,
            secure: Boolean(process.env.PRODUCTION),
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 12, // 12 hora
        });

        res.status(200).json({ message: "Login successful" });

    } catch (error: any) {
        res.status(400).json({ error: error.message || "Login failed" });
    }
}

export const Register = async (req: Request, res: Response): Promise<void> => {
    try {

        await register_service(req.body);
        res.status(200).json({ message: "Register successful" });

    } catch (error: any) {
        res.status(400).json({ error: error.message || "Register failed" });
    }
}
