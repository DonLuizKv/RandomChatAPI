import { ExpressServer } from "./infrastructure/express.ts/Express";
import { Database } from "./infrastructure/persistence/Database";

export class App {
    private readonly server: ExpressServer = new ExpressServer();
    private readonly database: Database = new Database();

    async Start(PORT: number) {
        await this.database.connect();

        this.LoadModules();

        await this.server.initialize(PORT);
    }

    private LoadModules() { }

}