import { User } from "../../domain/users/user.entity";
import { UserRepository } from "../../domain/users/UserRepository";

export class CreateUser {
    // Se lo metemos por DI
    constructor(private userRepository: UserRepository) { }

    async run(uid: string, username: string, email: string, password: string): Promise<void> {
        const user = new User(uid, username, email, password);
        await this.userRepository.save(user);
    }
} 