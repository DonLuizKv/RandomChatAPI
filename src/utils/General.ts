import { randomBytes } from "crypto";

export const CreateID = (prefix: string, size: number = 16): string => {
    const randomPart = randomBytes(size).toString("hex");
    return `${prefix}-${randomPart}`;
};