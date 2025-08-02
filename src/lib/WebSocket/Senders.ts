import { Server } from "socket.io";

export function SEND_USER(io: Server, socketId: string, event: string, payload: any) {
    io.to(socketId).emit(event, payload);
}

export function SEND_ALL(io: Server, event: string, payload: any) {
    io.emit(event, payload);
}

export function SEND_ROOM(io: Server, room: string, event: string, payload: any) {
    io.to(room).emit(event, payload);
}
