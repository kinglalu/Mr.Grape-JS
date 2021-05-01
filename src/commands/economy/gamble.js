const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "gamble",
                type: "economy",
                description: "50/50 chance of losing, or getting the amount you bet.",
                usage: "<number of :star:s>",
                aliases: ["bet"],
                saying: "If you have a gambling problem, call 1-800-522-4700.",
                cooldown: 5,
                fan: true
            });
        }

        randomize(rigged) {
            const riggedArr = [1, 2, 3, 4, 4, 6];
            return rigged ? riggedArr[super.randomize(riggedArr.length)] : super.randomize(6) + 1;
        }

        wait(seconds) {
            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
        }

        async verify(msg) {
            const collector = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 7000 });
            const message = collector.first().content.toLowerCase();

            if (message === "y" || message === "yes") return true;
            else return false;
        }

        async main(msg) {
            let rigged = false;
            const balance = this.eco.users.getBalance(msg.author.id);
            const number = msg.params[0] === "all" || msg.params[0] === "max" ? balance : +msg.params[0];

            if (!number || number < 0 || number > balance) return msg.send(this.client.token);

            if (await this.eco.items.getItem(msg.author.id, "rigged die")) {
                msg.send(this.client.token);

                const rig = await this.verify(msg);
                if (rig) rigged = true;
            }

            if (number === balance) {
                msg.send("Are you sure you wanna do that?");

                const gamble = await this.verify(msg);
                if (!gamble) return msg.send("I thought so.");
            }

            const dice = this.randomize(rigged);
            const gambleEmbed = new Embed()
                .setTitle(`${msg.author.username}'s gambling table`)
                .addField(this.client.token);

            const gambleMsg = await msg.send(gambleEmbed);
            await this.wait(1.7);
            gambleMsg.edit(gambleEmbed.addField(this.client.token));
            await this.wait(3.5);
            gambleMsg.edit(gambleEmbed.addField(dice, "\u200b"));
            await this.wait(1.7);

            if (dice % 2 === 0) {
                gambleMsg.edit(gambleEmbed.addField(this.client.token, "\u200b"));
                if (rigged) {
                    const caught = super.randomize(25);
                    if (caught === 1) {
                        await this.wait(1.7);
                        gambleMsg.edit(gambleEmbed.addField(this.client.token, "\u200b"));
                        return this.eco.users.add(msg.author.id, -number);
                    }
                }
                this.eco.users.add(msg.author.id, number);
            }
            else {
                gambleMsg.edit(gambleEmbed.addField(this.client.token));
                this.eco.users.add(msg.author.id, -number);
            }
        }
    };
