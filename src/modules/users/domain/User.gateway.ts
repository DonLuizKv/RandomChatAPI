import { User } from "../../users/domain/User.entity";

export interface UserGateway {
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}