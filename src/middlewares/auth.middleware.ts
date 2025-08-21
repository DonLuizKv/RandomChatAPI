import { NextFunction, RequestHandler, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticatedRequest, jwtUserToken } from "../types/Auth";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const VERIFY: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token || typeof token !== 'string') {
        res.status(403).json({ error: 'Token not found' });
        return;
    }

    try {
        const splitBearer = token.startsWith('Bearer ') ? token.slice(7) : token
        const decoded = jwt.verify(splitBearer, JWT_SECRET) as jwtUserToken;

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid Token or Expired' });
    }
};

export const AuthMiddleware = {
    VERIFY,
};