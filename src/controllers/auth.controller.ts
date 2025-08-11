import { Request, Response } from "express";
import { login, register } from "../services/auth.service";

const Login = async (req: Request, res: Response) => {
    try {
        await login(req.body);
        res.status(200).json({ message: "Login successful" });
    } catch (error) {

    }
}

const Register = async (req: Request, res: Response) => {
    try {
        await register(req.body);
        res.status(200).json({ message: "Register successful" });
    } catch (error) {

    }
}

export const AuthController = {
    Login,
    Register
};