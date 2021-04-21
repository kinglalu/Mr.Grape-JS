const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "purge",
                type: "moderation",
                aliases: ["prune", "clean"],
                description: "Purge messages from a channel.",
                usage: "<number>",
                cooldown: 1,
                saying: "Don't spam this command.",
                requiredPermissions: ["MANAGE_MESSAGES"]
            });
        }

        async main(msg) {
            const number = +msg.params[0];

            if (!number) return msg.send("Bruh give me a valid number of messages to purge.");

            const [iterations, leftover] = [~~(number / 100), number % 100];

            for (let i = 0; i < iterations; i++) await msg.channel.bulkDelete(100);
            if (leftover > 0) await msg.channel.bulkDelete(leftover);
            
            const confirm = await msg.send("Purged messages!");
            setTimeout(() => { confirm.delete(); }, 2000);
        }
    };