import { User } from "../domain/User.entity";
import { UserGateway } from "../domain/User.gateway";

export class CreateUser {
    // Se lo metemos por DI
    constructor(private userGateway: UserGateway) { }

    async run(uid: string, username: string, email: string, password: string): Promise<void> {
        const user = new User(uid, username, email, password);
        await this.userGateway.save(user);
    }
} 