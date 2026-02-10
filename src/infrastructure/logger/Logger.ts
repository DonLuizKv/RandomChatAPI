// libs/logger/Logger.ts
import { Request, Response, NextFunction } from "express";

type Color = "black" | "red" | "green" | "yellow" | "blue" | "violet" | "white" | "cyan";
type LogLevel = "info" | "warn" | "error" | "http" | "socket" | "db";
type HttpMethods = "POST" | "PUT" | "DELETE" | "GET"

type ExtraConfigLog = {
    styles?: LogConfig,
    prefix?: string,
    sufix?: string
}

interface StyleConfig {
    color?: Color;
    bgColor?: Color;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

type LogPart = "general" | "tag" | "msg";

type LogConfig = Partial<Record<LogPart, StyleConfig>>;

const COLORS: Record<Color, string> = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[38;5;21m",
    violet: "\x1b[35m",
    white: "\x1b[37m",
    cyan: "\x1b[",
};

const BG_COLORS: Record<Color, string> = {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    violet: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
};

const HTTP_METHOD_COLORS: Record<HttpMethods, Color> = {
    GET: "green",
    POST: "blue",
    PUT: "violet",
    DELETE: "red"
}

const RESET = "\x1b[0m";

export default new class Logger {

    constructor() { }

    private applyStyle(text: string, style?: StyleConfig, general?: StyleConfig): string {
        if (!style && !general) return text;

        const merged: StyleConfig = { ...general, ...style };
        const effects: string[] = [];

        if (merged.color) effects.push(COLORS[merged.color]);
        if (merged.bgColor) effects.push(BG_COLORS[merged.bgColor]);
        if (merged.bold) effects.push("\x1b[1m");
        if (merged.italic) effects.push("\x1b[3m");
        if (merged.underline) effects.push("\x1b[4m");

        return effects.join("") + text + RESET;
    }

    private log(tag: LogLevel, message: string | Error, config: LogConfig = {}, prefix: string = "", sufix: string = ""): void {
        const msgText = message instanceof Error ? message.message : message;

        const tagPart = this.applyStyle(tag.toUpperCase(), config.tag, config.general);
        const msgPart = this.applyStyle(msgText, config.msg, config.general);

        console.log(`${prefix}[${tagPart}] ${msgPart}${sufix}`);

        if (message instanceof Error && message.stack) {
            const stackPart = this.applyStyle(message.stack, config.msg, config.general);
            console.log(stackPart);
        }
    }

    // green
    info(msg: string, extra: ExtraConfigLog = {}) {
        this.log(
            "info",
            msg,
            {
                general: { color: "green" },
                tag: {
                    color: "green",
                    bold: true
                },
                ...extra.styles
            },
            extra.prefix,
            extra.sufix
        );
    }

    // yellow
    warn(msg: string, extra: ExtraConfigLog = {}) {
        this.log(
            "warn",
            msg,
            {
                general: { color: "yellow" },
                tag: {
                    color: "yellow",
                    bold: true
                },
                ...extra.styles
            },
            extra.prefix,
            extra.sufix
        );
    }

    // red
    error(msg: string | Error, extra: ExtraConfigLog = {}) {
        if (msg instanceof Error) {
            this.log(
                "error",
                msg.message,
                {
                    general: { color: "red" },
                    tag: {
                        color: "red",
                        bold: true
                    },
                    ...extra.styles
                },
                extra.prefix,
                extra.sufix
            );
            throw msg;
        } else {
            this.log(
                "error",
                msg,
                {
                    general: { color: "red" },
                    tag: {
                        color: "red",
                        bold: true
                    },
                    ...extra.styles
                },
                extra.prefix,
                extra.sufix
            );
            throw Error
        }
    }

    // white
    http(msg: string, extra: ExtraConfigLog = {}) {
        this.log(
            "http",
            msg,
            {
                general: { color: "white" },
                tag: {
                    color: "white",
                    bold: true
                },
                ...extra.styles
            },
            extra.prefix,
            extra.sufix
        );
    }

    // violet
    socket(msg: string, extra: ExtraConfigLog = {}) {
        this.log(
            "socket",
            msg,
            {
                general: { color: "violet" },
                tag: {
                    color: "violet",
                    bold: true
                },
                ...extra.styles
            },
            extra.prefix,
            extra.sufix
        );
    }

    // blue
    database(msg: string, extra: ExtraConfigLog = {}) {
        this.log(
            "db",
            msg,
            {
                general: { color: "blue" },
                tag: {
                    color: "blue",
                    bold: true
                },
                ...extra.styles
            },
            extra.prefix,
            extra.sufix
        );
    }

    httpMiddleware() {
        return (req: Request, res: Response, next: NextFunction) => {
            const start = Date.now();
            res.on("finish", () => {
                const duration = Date.now() - start;
                const method = req.method.toUpperCase() as HttpMethods;
                const color = HTTP_METHOD_COLORS[method] ?? "white";
                const styledMethod = this.applyStyle(method, { color });

                this.http(
                    `${styledMethod} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
                );
            });
            next();
        };
    }

}

