import { Request, Response } from "express";
import { create_user } from "../services/user.service";

const CreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        await create_user(req.body);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
};

export const UserController = {
    CreateUser,
}