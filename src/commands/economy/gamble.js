const { EconomyCommand, Embed } = require("../../../lib");
module.exports = class extends EconomyCommand {};

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
                cooldown: 30,
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

            if (await this.eco.items.getItem(msg.author.id, "rigged die")) {
                msg.send("Do you want to use your rigged die?");

                const rig = await this.verify(msg);

                if (rig) {
                    rigged = true;
                    if (!number || number*2 < 0 || number*2 > balance) return msg.send`You can't bet ${number}`;
                } else if (!number || number < 0 || number > balance) return msg.send`You can't bet ${number}`;
            }
            if (number === balance) {
                msg.send("Are you sure you wanna do that?");

                const gamble = await this.verify(msg);
                if (!gamble) return msg.send("I thought so.");
            }

            const dice = this.randomize(rigged);
            const gambleEmbed = new Embed()
                .setTitle(`${msg.author.username}'s gambling table`)
                .addField("Ok, if you roll an even number you win, if you roll an odd number, you lose.", "‎");

            const gambleMsg = await msg.send(gambleEmbed);

            gambleMsg.edit(gambleEmbed.addField(`You rolled a ${dice}!`, "‎"));

            if (dice % 2 === 0) {
                gambleMsg.edit(gambleEmbed.addField(`Congrats, you get ${number} :star:s!`, "‎"));

                if (rigged) {
                    const caught = super.randomize(25);

                    if (caught === 1) {
                        await this.wait(1.7);

                        gambleMsg.edit(gambleEmbed.addField(`You were caught and lost ${number} :star:s!`.toString(), "‎"));

                        return this.eco.users.add(msg.author.id, -number);
                    }
                }
                this.eco.users.add(msg.author.id, number);
            }
            else {
                gambleMsg.edit(gambleEmbed.addField(`You lost ${number} :star:s!`.toString(), "‎"));
                
                // This will overflow
                this.eco.users.add(msg.author.id, -number);
            }
        }
    };
