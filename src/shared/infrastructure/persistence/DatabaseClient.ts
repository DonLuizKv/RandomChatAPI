import { Pool, QueryResult } from "pg";
import Logger from "../logger/Logger";
import { Env } from "../../../config/env";

export class DatabaseClient {
    private static instance: DatabaseClient;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            host: Env.database.HOST,
            user: Env.database.USER,
            password: Env.database.PASSWORD,
            database: Env.database.NAME,
            port: Env.database.PORT,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        // this.setupPoolEvents();
    }

    public static getInstance(): DatabaseClient {
        if (!this.instance) {
            this.instance = new DatabaseClient();
        }
        return this.instance;
    }

    // private setupPoolEvents(): void {
    //     this.pool.on("error", (err) => Logger.error(err));
    //     this.pool.on("connect", () => Logger.database("New client connected to pool"));
    // }

    async query(sql: string, params: any[] = []): Promise<QueryResult> {
        try {
            if (!sql || typeof sql !== "string") {
                Logger.error("SQL query is required and must be a string", {
                    styles: {
                        msg: { color: "red" }
                    }
                });
            }

            if (sql.includes("--") || /;\s*drop\s+/i.test(sql)) {
                Logger.error("Potentially dangerous SQL detected", {
                    styles: {
                        msg: { color: "red" }
                    }
                });
            }

            const { command, rowCount, oid, rows, fields } = await this.pool.query(sql, params)

            return {
                command,
                rowCount,
                oid,
                rows,
                fields,
            }

        } catch (error) {
            Logger.error(error as Error);
            throw error;
        }
    }

    // async transaction(queries: { sql: string; params?: any[] }[]): Promise<any[]> {
    //     const client = await this.pool.connect();
    //     try {
    //         await client.query("BEGIN");
    //         const results = [];

    //         for (const { sql, params = [] } of queries) {
    //             const result = await client.query(sql, params);
    //             results.push(result.rows);
    //         }

    //         await client.query("COMMIT");
    //         return results;
    //     } catch (error) {
    //         await client.query("ROLLBACK");
    //         Logger.error(error as Error);
    //         throw error;
    //     } finally {
    //         client.release();
    //     }
    // }

    async connect(): Promise<void> {
        try {
            const client = await this.pool.connect();
            Logger.database(`Connected to the ${process.env.DB_NAME} database`, {
                styles: { msg: { color: "blue" } },
            });
            client.release();
        } catch (error) {
            Logger.error(error as Error);
            process.exit(1);
        }
    }

    async close(): Promise<void> {
        try {
            await this.pool.end();
            Logger.database("DatabaseClient connections closed");
        } catch (error) {
            Logger.error(error as Error);
        }
    }

    getPoolStats() {
        return {
            totalCount: this.pool.totalCount,
            idleCount: this.pool.idleCount,
            waitingCount: this.pool.waitingCount,
        };
    }
}
