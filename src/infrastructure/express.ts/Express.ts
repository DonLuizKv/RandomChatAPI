import Express from "express";
import http from "node:http";
import cors from "cors";
import Logger from "../logger/Logger";
import cookieParser from "cookie-parser";

export class ExpressServer {
    private app: Express.Application;
    private server: http.Server;

    constructor() {
        this.app = Express();
        this.server = http.createServer(this.app);

        this.setMiddlewares();
    }

    private setMiddlewares() {
        this.app.use(Logger.httpMiddleware());
        this.app.use(Express.json());
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    public async initialize(PORT: number) {
        this.server = this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}