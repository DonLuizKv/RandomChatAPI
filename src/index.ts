import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./Presentation/http/routes/auth.routes";
import { Authenticate } from "./Presentation/http/middlewares/auth.middleware";
import userRoutes from "./Presentation/http/routes/user.routes";
import Logger from "./lib/Logger";
import { WebSocketServer } from "./Infra/WebSocketServer";

// env
dotenv.config();
const PORT = process.env.PORT || 5000;
const ORIGINS = process.env.ORIGINS?.split(",") || [];

// Server
const app = express();
const server = http.createServer(app);
// const DataBase = DBConnection.getInstance();
const webSocketServer = new WebSocketServer(server);

// configs
const CorsOptions = {
    origin: ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

// Libs
webSocketServer.initialize();
// DataBase.initialize();

// Middleware
app.use(cors(CorsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(Logger.httpMiddleware())

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`, {
        prefix: "\n"
    })
});