const { ModerationCommand, Embed } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "prefix",
                type: "moderation",
                description: "Set the bot's prefix.",
                usage: "<prefix>",
                saying: "Don't prefix.",
                cooldown: 2,
                requiredPermissions: ["MANAGE_SERVER"],
                botPermissions: ["SEND_MESSAGES"]
            });
        }

        async main(msg) {
            const prefix = msg.params[0];

            if (!prefix) return msg.send("Give me a prefix.");

            msg.guild.setPrefix(prefix);

            const prefixEmbed = new Embed()
                .setTitle("Prefix")
                .addField("Set to", prefix);
            msg.send(prefixEmbed);
        }
    };