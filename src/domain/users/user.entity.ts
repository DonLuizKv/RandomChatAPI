export class User {
    constructor(
        public readonly uid: string,
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
    ) { }
}