module.exports =
    class {
        constructor(name, client) {
            this.name = name;
            this.client = client;
        }

        main() { throw new Error(`Module ${this.name} does not have a main method!`); }
    };