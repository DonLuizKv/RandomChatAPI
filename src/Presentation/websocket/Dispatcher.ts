import { Server, Socket } from "socket.io";
import { UserSocket } from "../../Infrastructure/WebSocketServer";

type Channel = "USER" | "MESSAGE" | "NOTIFICATION" | "CHATROOM" | "SYSTEM";
// type Action = "CREATE" | "UPDATE" | "DELETE" | "ACCEPT" | "CANCEL";
type Message = Record<string, string | number | boolean>;

type Package = {
    type: "direct" | "broadcast";
    to: string | Channel[];
    message: Message;
}

export class Event {
    constructor(
        private io: Server,
        private socket: Socket,
        private connectedUsers: UserSocket[] // userId -> socketId
    ) { }

    /**
     * 
     * @param packages Array de metadatos de envío
     */
    Dispatcher(packages: Package[], direction: string) {
        packages.forEach((pkg: Package) => {
            if (pkg.type === "direct") {
                this.Direct(direction, pkg.to, pkg.message);
            } else {
                this.BroadCast(direction, pkg.to as Channel[], pkg.message);
            }
        });
    }

    private Direct(event: string, to: string | Channel[], message: Message) {
        this.socket.to(to).emit(event, message);
    }

    private BroadCast(event: string, to: Channel[], message: Message) {
        this.io.to(to).emit(event, message);
    }

    private ChatEvents() {
        this.socket.on("user:chat:message:send", (data: any) => console.log(data));
    }

    init() {
        this.ChatEvents();
    }
}