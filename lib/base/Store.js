const { join } = require("path");
const { readdirSync, statSync } = require("fs");
const { Collection } = require("discord.js");

module.exports =
    class extends Collection {
        constructor(name, client, directory, holds) {
            super();
            this.name = name;
            this.client = client;
            this.directory = join(process.cwd(), "src", directory);
            this.holds = holds;
        }

        _register(component, dir) {
            if (!(component instanceof this.holds)) {
                throw this.client.console.error(new Error(`${component.name} doesn't belong in ${this.name}!`));
            }

            else if (super.has(component.name)) {
                throw this.client.console.error(new Error(`${component.name} already exists!`));
            }

            component.filepath = dir;
            return component.init ? component.init() : false;
        }

        load(dir) {
            const Component = require(dir);
            const component = new Component(this.client);

            if (component.name === undefined) return;

            this._register(component, dir);
            super.set(component.name, component);

            delete require.cache[require.resolve(dir)];
            return component;
        }

        init(path = this.directory, arr = []) {
            const files = readdirSync(path);

            for (const file of files) {
                const filePath = join(path, file);
                if (statSync(filePath).isDirectory()) this.init(filePath, arr);
                else if (filePath.endsWith(".js")) this.load(filePath);
            }

            return this;
        }
    };