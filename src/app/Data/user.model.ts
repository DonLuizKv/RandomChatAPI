import { Model } from "./Repository"

type user = {

}

export class UserModel extends Model<user> {
    constructor() {
        super("users")
    }

}