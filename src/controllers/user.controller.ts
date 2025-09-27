import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export const CreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.Create(req.body);

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
};
