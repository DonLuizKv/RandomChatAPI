import { Request, Response } from "express";
import { UserService } from "../../../Service/user.service";
import Logger from "../../../lib/Logger";

const service = new UserService();

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        await service.registerUser(req.body);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (error) {
        Logger.error(error as Error);
        return res.status(500).json({ msg: "" })
    }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (error) {
        Logger.error(error as Error);
        return res.status(500).json({ msg: "" })
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (error) {
        Logger.error(error as Error);
        return res.status(500).json({ msg: "" })
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (error) {
        Logger.error(error as Error);
        return res.status(500).json({ msg: "" })
    }
};



