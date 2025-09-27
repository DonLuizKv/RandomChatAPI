import { UserModel } from "../models/user.model";
import { User } from "../types/User";
import { CreateID } from "../utils/General";
import { Hash } from "../utils/Password";

export class UserService {
    constructor(
        private userModel: UserModel = new UserModel(),
    ) { }

    async Create(data: Omit<User, "id">) {
        const errors = {
            email: "This Email is already in use",
        };

        // await validateField(data, errors, "users");

        const id_user = CreateID("USR");
        const HashedPassword = await Hash(data.password);

        const user: User = {
            id: id_user,
            email: data.email,
            username: data.username,
            password: HashedPassword,
        };

        await this.userModel.POST(user);
    }

    async Update() { }

    async getUser() { }

    async getAllUsers() { }
};
