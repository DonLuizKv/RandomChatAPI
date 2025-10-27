import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { Event } from '../lib/Events';

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

    initialize() {
        this.io.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);

            socket.on('register', (userId) => {
                this.ActiveUsers.set(userId, socket.id);
                console.log(`User registered: ${userId}`);
            });

            const events = new Event(this.io, socket, this.getActiveUsers());
            events.init();

            socket.on('disconnect', () => {
                this.ActiveUsers.forEach((value, key) => {
                    if (value === socket.id) {
                        this.ActiveUsers.delete(key);
                        console.log(`User disconnected: ${key}`);
                    }
                });
            });
        });
    }

    getActiveUsers(): UserSocket[] {
        return Array.from(this.ActiveUsers.entries()).map(([userId, socketId]) => ({ userId, socketId }));
    }

}