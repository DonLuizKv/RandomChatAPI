import { Model } from "./Model"

type user = {

}

export class UserModel extends Model<user> {
    constructor() {
        super("users")
    }

}