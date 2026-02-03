import fs from "fs";
import path from "path";

export function makeModule(name: string) {
    const className = capitalize(name);
    const basePath = path.join(process.cwd(), "src/modules", className);

    if (fs.existsSync(basePath)) {
        console.error("\x1b[31mError, this module already exist.\x1b[0m");
        process.exit(1);
    }

    fs.mkdirSync(basePath, { recursive: true });


    fs.writeFileSync(
        path.join(basePath, `${name}.module.ts`),
        `import { Express } from "express";\n
export class ${className}Module {
    static Create(app: Express){
        app.use("/${name}", );
    }
}\n`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.service.ts`),
        `export class ${className}Service {}\n`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.repository.ts`),
        `import { Repository } from "../../infrastructure/db/Repository";\nexport class ${className}Repository extends Repository<unknown> {}\n`
    );

    fs.writeFileSync(
        path.join(basePath, `${name}.controller.ts`),
        `import { Router } from "express";
import { ${className}Service } from "./${name}.service";\n
export class ${className}Controller {
    public router = Router();\n
    constructor(private service: ${className}Service) {
        this.router.get("/", );
    }
}\n`
    );

    console.log(`\x1b[32mModule "${name}" has been created :).\x1b[0m`);
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}