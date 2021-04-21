const { Collection } = require("discord.js");
const Queues = new Collection();
const Command = require("./Command");

module.exports =
    class extends Command {
        get musicQueues() {
            return Queues;
        }
    };