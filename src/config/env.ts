import { config } from "dotenv";

config();

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

function number(name: string, defaultValue?: number): number {
    const value = process.env[name];
    if (!value) {
        if (defaultValue === undefined) {
            throw new Error(`Missing environment variable: ${name}`);
        }
        return defaultValue;
    }

    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new Error(`Environment variable ${name} must be a number`);
    }

    return parsed;
}

function list(name: string, defaultValue: string[] = []): string[] {
    const value = process.env[name];
    if (!value) return defaultValue;
    return value.split(",").map(v => v.trim());
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const Env = {
    global: {
        PORT: number("PORT", 3000),
        NODE_ENV: process.env.NODE_ENV ?? "dev",
        ORIGINS: list("ORIGINS"),
    },

    rateLimiter: {
        GLOBAL: number("GLOBAL_RATE_LIMITER", 10),
        AUTH: number("AUTH_RATE_LIMITER", 5),
    },

    database: {
        HOST: required("DB_HOST"),
        PORT: number("DB_PORT", 5432),
        USER: required("DB_USER"),
        PASSWORD: required("DB_PASSWORD"),
        NAME: required("DB_NAME"),
    },

    jwt: {
        SECRET: required("JWT_SECRET"),
        EXPIRES_IN: required("JWT_EXPIRES_IN")!,
    },
} as const;
