const centra = require("centra");
const Command = require("./Command");

module.exports =
    class extends Command {
        async request(opts = {}) {
            const res = await centra(opts.url).query(opts.params).send();
            return await res.json();
        }
    };