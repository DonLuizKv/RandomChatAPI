import { DBConnection } from "../Database/DBConnection";

interface interfaceModel<T> {
    GET: (id: string) => Promise<T>;
    GETALL: () => Promise<T[]>;
    POST: (data: T) => void;
    PUT: (id: string, data: T) => void;
    DELETE: (id: string) => Promise<Boolean>;
}

export class Model<T> implements interfaceModel<T> {
    constructor(
        protected table: string, // apuntar a la tabla por cada instancia
        protected db: DBConnection = DBConnection.getInstance()
    ) { };

    async GET(id: string): Promise<T> {
        const row = await this.db.query<T>(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
        return row[0];
    }

    async GETALL(): Promise<T[]> {
        return [];
    }

    async POST(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data);
        const values = Object.values(data);

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        const query = `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders})`;

        await this.db.query(query, values);
    }

    async PUT(id: string, data: T): Promise<void> { }

    async DELETE(id: string): Promise<boolean> {
        return true;
    }
}