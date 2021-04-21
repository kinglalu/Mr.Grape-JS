const chalk = require("chalk");
const { inspect } = require("util");
const { Console } = require("console");

const logging = {
    warn: ["bgYellow", "underline"],
    log: ["inverse", "bold"],
    success: ["bgGreen", "dim"],
    error: ["bgRed", "bold", "underline"],
    debug: ["bgMagenta", "italic"]
};

module.exports =
    class extends Console {
        constructor() {
            super(process.stdout, process.stderr);

            for (const method of Object.keys(logging)) {
                this[method] = (args) => { this.write(args, method); };
            }
        }

        get timestamp() {
            return new Date().toLocaleTimeString();
        }

        write(content, type = "log") {
            super[type === "error" ? "error" : "log"](chalk`{${logging[type].join(".")} ${this._format(content)} | ${this.timestamp}}`);
        }

        _format(data) {
            if (typeof data === "object") {
                if (Array.isArray(data) && data.every(e => typeof e === "string")) return data.join("\n");
                if (data instanceof Error) return data.stack || data.message;
                else return inspect(data);
            }
            return String(data);
        }
    };