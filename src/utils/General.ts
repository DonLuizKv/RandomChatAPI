import { RowDataPacket } from "mysql2";
import Database from "./Database";
import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { StyleConfig } from "../types/Generic";

export const validateField = async (data: Record<string, string | number>, errors: Record<string, string>, table: string) => {
    const fields = Object.keys(errors);
    const values = fields.map(field => data[field]);

    if (fields.length === 0) return;

    // Proteger el nombre de la tabla (nunca lo interpoles directo si proviene de entrada del usuario)
    const safeTable = table.replace(/[^a-zA-Z0-9_]/g, ""); // evitar SQL injection por nombre de tabla

    const whereClause = fields.map(field => `${field} = ?`).join(" OR ");
    const query = `SELECT ${fields.join(", ")} FROM \`${safeTable}\` WHERE ${whereClause} LIMIT 1`;

    const [rows] = await Database.query<RowDataPacket[]>(query, values);

    if (rows.length > 0) {
        const found = rows[0];
        for (const field of fields) {
            if (found[field]) {
                throw new Error(errors[field]);
            }
        }
    }
};

export const Hash = async (plainPassword: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(plainPassword, salt);
};

export const Compare = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcryptjs.compare(plainPassword, hashedPassword);
};

export const CreateID = (prefix: string, size: number = 5): string => {
    // 5 bytes ≈ 10 caracteres hex
    const randomPart = randomBytes(size).toString("hex");
    return `${prefix}-${randomPart}`;
};

/**
 * 
 * colores:
 * black
 * red
 * green
 * yellow
 * blue
 * violet
 * cyan
 * white
 */
export const Print = (message: string, config: StyleConfig = {}) => {
    const colors: Record<string, string> = {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        violet: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    };

    const bgColors: Record<string, string> = {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
    };

    const effects: string[] = [];

    if (config.color && colors[config.color.toLowerCase()])
        effects.push(colors[config.color.toLowerCase()]);
    if (config.bgColor && bgColors[config.bgColor.toLowerCase()])
        effects.push(bgColors[config.bgColor.toLowerCase()]);

    if (config.bold) effects.push("\x1b[1m");
    if (config.italic) effects.push("\x1b[3m");
    if (config.underline) effects.push("\x1b[4m");

    const reset = "\x1b[0m";
    const styledMessage = effects.join("") + message + reset;

    console.log(styledMessage);
}

