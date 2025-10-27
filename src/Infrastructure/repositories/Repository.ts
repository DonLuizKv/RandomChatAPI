
// interface interfaceModel<T> {
//     get: (id: string) => Promise<T>;
//     getAll: () => Promise<T[]>;
//     create: (data: T) => void;
//     update: (id: string, data: T) => void;
//     delete: (id: string) => Promise<Boolean>;
// }

import { Database } from "../database";


export abstract class Repository<T extends object> {
    protected abstract table: string;

    constructor(
        protected readonly database = Database.getInstance()
    ) { }

    async Find(id: number | string): Promise<T | null> {
        const [rows]: any = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ? LIMIT 1`,
            [id]
        );
        return rows.length ? (rows[0] as T) : null;
    }

    async FindAll(): Promise<T[]> {
        const [rows]: any = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return rows as T[];
    }

    async Insert(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const placeholders = keys.map(() => "?").join(", ");
        const query = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders})`;

        const [result] = await this.database.query(query, values);
    }

    async Update(id: number | string, data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const setClause = keys.map((key) => `${key} = ?`).join(", ");
        const query = `UPDATE ${this.table} SET ${setClause} WHERE id = ?`;

        await this.database.query(query, [...values, id]);
    }

    async Delete(id: number | string): Promise<boolean> {
        const [result]: any = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }
}
