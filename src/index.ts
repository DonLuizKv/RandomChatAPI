import { App } from "./app";
import { Env } from "./config/env";

async function main() {
    const app = new App();
    await app.Start(Env.global.PORT);
}

main();