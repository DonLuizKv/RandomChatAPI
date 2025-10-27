
// interface interfaceModel<T> {
//     get: (id: string) => Promise<T>;
//     getAll: () => Promise<T[]>;
//     create: (data: T) => void;
//     update: (id: string, data: T) => void;
//     delete: (id: string) => Promise<Boolean>;
// }

import { Database } from "../infrastructure/database";

export class Model<T> {
    constructor(
        protected table: string,
        protected db: Database = Database.getInstance()
    ) { };

    async Find(id: string): Promise<T> {
        const row = await this.db.query<T>(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
        return row[0];
    }

    async FindAll(): Promise<T[]> {
        return [];
    }

    async Insert(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        const query = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders})`;

        await this.db.query(query, values);
    }

    async Update(id: string, data: T): Promise<void> { }

    async Delete(id: string): Promise<boolean> {
        return true;
    }
}