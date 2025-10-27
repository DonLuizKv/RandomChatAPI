import { UserTable } from "../../Data/models/user.model";
import { User } from "../../Domain/entities/User";
import { Repository } from "./Repository";

export class UserRepository extends Repository<User> {

    constructor(){
        super(UserTable.tableName)
    }

    public async SetConfigs() {}
}