import { Env } from "./config/env";
import { HttpServer } from "./shared/infrastructure/express/express";
import { DatabaseClient } from "./shared/infrastructure/persistence/DatabaseClient";

async function Init() {
    const db = DatabaseClient.getInstance();
    await db.connect();
    // const redis = await RedisClient.connect();

    // B. Inicializar Módulos (Inyección de dependencias manual)
    // UsersModule.init(db, server.api);
    // ProductsModule.init(db, server.api);
    // OrdersModule.init(db, server.api);

    const server = HttpServer.getInstance();

    // C. Encender motores
    server.start(Env.global.PORT);
}

Init();