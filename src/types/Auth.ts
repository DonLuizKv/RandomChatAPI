import jwt from "jsonwebtoken";
import { Request } from "express";

export interface jwtUserToken {
    id: string;
    role: string;
}

export interface AuthenticatedRequest extends Request {
    user?: jwtUserToken | jwt.JwtPayload;
}

export type TokenPayload = {
    id: string;
    username: string;
    email: string;
}