import { CreateID } from "../utils/General";
import { Hash } from "../utils/Password";

export class UserService {
    constructor(
        private userModel: UserModel = new UserModel(),
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

        await this.userModel.Insert(user);
    }

    async update() { }

    async UserById() { }

    async AllUsers() { }
};
