import { Server, Socket } from "socket.io";
import { CreateID, Print } from "../../utils/General";

export class RoomManager {
    // Arreglo de espera para usuarios
    private Waiting: Socket[] = [];

    constructor(private io: Server) { }

    //? methods
    public Pair(socket: Socket) {
        if (this.Waiting.length > 0) {
            // Sacar al usuario que esta esperando
            const userWaiting = this.Waiting.pop()!;

            // crear sala
            const roomID = CreateID("ROOM", 5);

            // meter al usuario nuevo y al viejo
            socket.join(roomID); // presionó emparejar
            userWaiting.join(roomID); // estaba esperando

            socket.emit("paired", { room: roomID, userToChat: userWaiting.id });
            userWaiting.emit("paired", { room: roomID, userToChat: socket.id });

            Print(`¯\_( ͡° ͜ʖ ͡°)_/¯ - ${socket.id} emparejado con ${userWaiting.id}`, { color: "white", underline: true });
        } else {
            this.Waiting.push(socket);
            socket.emit('waiting');
            console.log(`🕓 ${socket.id} esperando en la cola`);
        }
    }

    public Remove() {

    }
}

/**
 * import { Socket, Server } from "socket.io";

export class RoomManager {
  private waitingQueue: Socket[] = [];

  constructor(private io: Server) {}

  public pair(socket: Socket) {
    if (this.waitingQueue.length > 0) {
      const peer = this.waitingQueue.pop()!;
      const roomId = `room_${socket.id}_${peer.id}`;

      socket.join(roomId);
      peer.join(roomId);

      socket.emit('paired', { roomId, peerId: peer.id });
      peer.emit('paired', { roomId, peerId: socket.id });

      console.log(`✅ ${socket.id} emparejado con ${peer.id}`);
    } else {
      this.waitingQueue.push(socket);
      socket.emit('waiting');
      console.log(`🕓 ${socket.id} esperando en la cola`);
    }
  }

  public removeFromQueue(socket: Socket) {
    const index = this.waitingQueue.findIndex(s => s.id === socket.id);
    if (index !== -1) {
      this.waitingQueue.splice(index, 1);
      console.log(`❌ ${socket.id} fue removido de la cola`);
    }
  }
}

 */