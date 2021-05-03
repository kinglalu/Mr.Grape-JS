const { Cooldowns, Embed, Event } = require("../../../lib");

module.exports =
    class extends Event {
        constructor(...args) {
            super(...args, {
                name: "message",
            });

            this.cooldownManager = new Cooldowns();
        }

        async main(message) {

            if (message.content === this.client.mention) {
                const helloEmbed = new Embed()
                    .setTitle("Hello!")
                    .addField("Sup. I'm Mr. Grape", `**To get started, type ${message.prefix}help, or you can ping me!**`);
                message.send(helloEmbed);
            }

            if (message.author.bot || !message.command || !message.guild || this.client.config.blacklisted.has(message.author.id)) return;

            const command = message.command;
            const cooldown = await this.cooldownManager.main(command, message.author.id);

            if (cooldown) {
                const cooldownEmbed = new Embed()
                    .setTitle("Chill out!")
                    .addField(command.saying, `Wait ${this.cooldownManager.format(cooldown)}`);
                return message.send(cooldownEmbed);
            }

            if (command.type === "moderation") {
                if (!message.member.hasPermission(command.requiredPermissions)) {
                    return message.send("You don't have permission to run this command!");
                }
                else if (!message.guild.me.hasPermission(command.botPermissions)) {
                    return message.send("I don't have permission to execute that command!");
                }
            }

            // This is stupid
            else if (command.type === "music" && command.name !== "lyrics") {
                const { channel } = message.member.voice;
                const { channel: myChannel } = message.guild.me.voice;
                /*
                if (!command.musicQueues.has(message.guild.id) && command.name !== "play") {
                    return message.send("There is nothing playing!");
                }
                */
                if (!channel && myChannel && myChannel !== channel && !["np", "queue"].includes(command.name)) {
                    return message.send("You have to be in my voice channel!");
                }
            }

            try {
                command.main(message);
            } catch (err) {
                console.log(err);
                
                message.send(`Can't run ${command.name} due to a bug.`.toString());
                message.send`Do you want to report this bug to the developers?`;

                const verification = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 3500 });

                const response = verification.first().content.toLowerCase();

                if (response === "yes" || response === "y") {
                    const channel = await this.client.channels.fetch(this.client.config.defaultChannels.bugs);

                    const bugEmbed = new Embed()
                        .setTitle("Bug Report")
                        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
                        .addFields(
                            { name: "Author", value: `Username: ${msg.author.username}\nID: ${msg.author.id}`, inline: true },
                            { name: "Guild", value: msg.guild.name, inline: true },
                            { name: "Bug", value: `${command.name}` }
                        );

                    channel.send(bugEmbed);
                }

                this.client.emit("commandError", command.name, err);
            }
            this.client.emit("commandRun", command.name, message.author);
        }
    };