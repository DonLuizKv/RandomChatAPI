import { User } from "../types/User";
import { CreateID, Hash, validateField } from "../utils/General";
import { UserModel } from "../models/user.model";

export const create_user = async (data: Omit<User, "id">) => {
    const errors = {
        email: "This Email is already in use",
    };

    await validateField(data, errors, "users");

    const id_user = CreateID("USR");
    const HashedPassword = await Hash(data.password);

    const user: User = {
        id: id_user,
        email: data.email,
        username: data.username,
        password: HashedPassword,
    };

    await UserModel.CREATE(user);

};