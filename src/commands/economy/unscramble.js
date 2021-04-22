const { Fruits } = require("../../../database");
const { EconomyCommand, Embed } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "unscramble",
                type: "economy",
                description: "Unscramble a word for stars.",
                usage: "<correct word>",
                aliases: ["unsc"],
                saying: "Scramble your unscrambling.",
                cooldown: 30,
                fan: true
            });
        }

        scramble(arr) {
            const original = [...arr];
            for (let i = arr.length - 1; i > 0; i--) {
                let j = super.randomize(i + 1);
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            if (original.join("") === arr.join("")) { return this.scramble(arr); }
            else { return arr.join(""); }
        }

        async main(msg) {
            const fruit = Fruits[super.randomize(Fruits.length)];
            const scrambled = this.scramble(fruit.split(""));

            const scrambledWord = new Embed()
                .setTitle("Unscramble!")
                .addField("Unscramble the word!", `${scrambled}`);

            msg.send(scrambledWord);

            const collector = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 7000 });

            if (!collector.size) {
                const timeoutEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s unscrambling`)
                    .addField("C'mon slowpoke", `The word was ${fruit}`);
                return msg.send(timeoutEmbed);
            }

            const message = collector.first().content.toLowerCase();

            if (message === fruit) {
                const starmagnet = await this.eco.items.getItem(msg.author.id, "starmagnet");
                const reward = super.randomize(3 * starmagnet ? 1 : starmagnet + 1) + 1;

                this.eco.users.add(msg.author.id, reward);

                const unscEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s unscrambling`)
                    .addField("Good job!", `You got ${reward} :star:s!`);
                return msg.send(unscEmbed);
            }

            else {
                const unscEmbed = new Embed()
                    .setTitle(`${msg.author.username}'s unscrambling`)
                    .addField("You're bad.", `It's ${fruit} not ${message}`);
                return msg.send(unscEmbed);
            }
        }
    };
