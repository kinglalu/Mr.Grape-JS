const centra = require("@aero/centra");
const Command = require("./Command");

module.exports =
    class extends Command {
        request(opts = {}) {
            return centra(opts.url).query(opts.params);
        }
    };