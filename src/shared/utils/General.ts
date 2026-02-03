import { randomBytes } from "crypto";

export const CreateID = (prefix: string, length = 6, type: "string" | "number" = "string"): string => {
    const CHARS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = randomBytes(length);

    switch (type) {
        case "string":
            let randomString: string = "";

            for (let i = 0; i < length; i++) {
                randomString += CHARS[bytes[i] % CHARS.length];
            }

            return `${prefix}-${randomString}`;
        case "number":
            let randomNum: number = 0;

            for (let i = 0; i < length; i++) {
                randomNum += bytes[i] % 10;
            }

            return `${prefix}-${randomNum}`;
        default:
            throw new Error("Invalid type");
    }
}

export const Time = {
    second: (n: number) => n * 1000,
    minute: (n: number) => n * 60 * 1000,
    hour: (n: number) => n * 60 * 60 * 1000,
    day: (n: number) => n * 24 * 60 * 60 * 1000,
    week: (n: number) => n * 7 * 24 * 60 * 60 * 1000,
};