import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { Event } from '../Presentation/websocket/Dispatcher';
import Logger from '../lib/Logger';

export type UserSocket = {
    userId: string;
    socketId: string;
};

export class WebSocketServer {
    protected io: Server;
    protected ActiveUsers = new Map<string, string>();

    constructor(server: HTTPServer) {
        this.io = new Server(server, {
            // solo WebSockets, nada de long polling
            // transports: ["websocket"],

            // habilitar CORS según tu frontend
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },

            // tamaño máximo de mensaje (sube si mandas blobs/pdfs/etc.)
            // maxHttpBufferSize: 1e6, // 1 MB por defecto
        });
    }

    getActiveUsers(): UserSocket[] {
        return Array.from(this.ActiveUsers.entries()).map(([userId, socketId]) => ({ userId, socketId }));
    }

    initialize() {
        Logger.info("WebSocket Server is running");
        this.io.on('connection', (socket) => {
            Logger.socket(`Client connected: ${socket.id}`);

            socket.on('register', (userId) => {
                this.ActiveUsers.set(userId, socket.id);
                Logger.socket(`User registered: ${userId}`);
            });

            const events = new Event(this.io, socket, this.getActiveUsers());
            events.init();

            socket.on('disconnect', () => {
                this.ActiveUsers.forEach((value, key) => {
                    if (value === socket.id) {
                        this.ActiveUsers.delete(key);
                        Logger.socket(`User disconnected: ${key}`);
                    }
                });
            });
        });
    }

}