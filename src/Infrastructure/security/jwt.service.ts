import jwt from "jsonwebtoken";
import { Env } from "../../config/env";

type JwtPayload = {
    sub: string; // userId
};


export class JwtService {
    private readonly secret = Env.jwt.SECRET;
    private readonly expiresIn = Env.jwt.EXPIRES_IN;

    sign(userId: string): string {
        const payload: JwtPayload = { sub: userId };

        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
        } as jwt.SignOptions);
    }

    verify(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.secret) as JwtPayload;
        } catch {
            throw new Error("Invalid token");
        }
    }
}
