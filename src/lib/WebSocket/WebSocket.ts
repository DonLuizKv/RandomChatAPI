import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { CreateID, Print } from '../../utils/General';
import { RoomManager } from './Rooms';

export class WebSocketServer {
    private io: Server;
    private RoomManager: RoomManager;
    private ActiveUsers = new Map<string, string>();

    constructor(server: HTTPServer) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            },
        });
        this.RoomManager = new RoomManager(this.io);
    }

    public initialize() {
        this.io.on('connection', (socket: Socket) => {
            Print(`- Client Connected: ${socket.id}`, { color: 'yellow', bold: true });

            socket.on("login", ({ userID }) => {
                this.ActiveUsers.set(userID, socket.id);
            })

            socket.on("pair", () => {
                this.RoomManager.Pair(socket);
            })

            socket.on('disconnect', () => {
                Print(`- Client Disconnected: ${socket.id}`, { color: 'red', bold: true });
                this.ActiveUsers.forEach((socketID, userID) => {
                    if (socketID === socket.id) {
                        this.ActiveUsers.delete(userID)
                    }
                });
            });

            socket.on('error', (error: Error) => {
                Print(`- Error from client: ${error}`, { color: 'red', bold: true });
            });
        });
    }
}