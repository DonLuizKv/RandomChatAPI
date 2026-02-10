import jwt from "jsonwebtoken";
import { Env } from "../../../config/env";

type JwtPayload = {
    sub: string; // userId
};

export const sign = (userId: string): string => {
    const payload: JwtPayload = { sub: userId };

    return jwt.sign(payload, Env.jwt.SECRET, {
        expiresIn: Env.jwt.EXPIRES_IN,
    } as jwt.SignOptions);
}

export const verify = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, Env.jwt.SECRET) as JwtPayload;
    } catch {
        throw new Error("Invalid token");
    }
}
