import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import http from "http";
import path from "path";

import userRoutes from "./routes/user.routes";
import { WebSocketServer } from "./lib/WebSocket/WebSocket";
import { Print } from "./utils/General";

// env
dotenv.config();
const PORT = process.env.PORT || 5000;
const ORIGINS = process.env.ORIGINS?.split(",") || [];

// Server
const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocketServer(server);

// configs
const CorsOptions = {
    origin: ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

webSocketServer.initialize();

// Middleware
app.use(cors(CorsOptions));
app.use(express.json());

// Routes
app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    Print(`\n- Server is running on port ${PORT}`, { color: "cyan", bold: true, italic: true });
});