import { User } from "../Domain/entities/User";
import { UserRepository } from "../Infrastructure/repositories/user.repository";
import { CreateID } from "../utils/General";
import { Hash } from "../utils/Password";

export class UserService {
    constructor(
        private userRepo: UserRepository = new UserRepository(),
    ) { }

    async registerUser(data: Omit<User, "id">) {

        const id_user = CreateID("USR");
        const HashedPassword = await Hash(data.password);

        const user: User = {
            id: id_user,
            email: data.email,
            username: data.username,
            password: HashedPassword,
        };

        await this.userRepo.Insert(user);
    }

    async update() { }

    async UserById() { }

    async AllUsers() { }
};
