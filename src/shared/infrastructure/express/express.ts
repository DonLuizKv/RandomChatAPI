import cookieParser from "cookie-parser";
import Express from "express";
import Logger from "../logger/Logger";
import http from "http";

export class HttpServer {
    private static instance: HttpServer;
    private app: Express.Application;
    private server: http.Server;

    private constructor() {
        this.app = Express();
        this.server = http.createServer(this.app);

        this.app.use(Express.json());
        this.app.use(cookieParser());
        this.app.use(Logger.httpMiddleware());
    }

    public static getInstance(): HttpServer {
        if (!HttpServer.instance) {
            HttpServer.instance = new HttpServer();
        }
        return HttpServer.instance;
    }

    public getApp(): Express.Application {
        return this.app;
    }

    public getServer(): http.Server {
        return this.server;
    }

    start(port: number) {
        this.server.listen(port, () => {
            Logger.http(`Server started on port ${port}`);
        });
    }

    stop() {
        this.server.close();
    }
}