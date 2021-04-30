const { RequestCommand, Embed } = require("../../../lib");
const stations = [];

module.exports =
    class extends RequestCommand {
        constructor(...args) {
            super(...args, {
                name: "radio",
                type: "music",
                aliases: ["r"],
                description: "Listen to the radio!",
                usage: "Type in the radio station to listen or the genre to search.",
                cooldown: 2,
                saying: "Calm down on the listening",
            });
        }

        // TODO: Play music in voice & stage channels
        // TODO: Have a server specific status showing the radio station played

        async init() {
            for (const genre of [3, 5, 7, 9, 13, 15, 21, 23, 25, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49]) {
                const body = await this.request({
                    url: `https://www.audacy.com/_components/stations-list/instances/genreTruncated.json?=&genre=${genre}`
                }).json();

                stations.push(...body.stations)
            }
        }

        async main(msg) {
            const { channel } = msg.member.voice;

            if (!channel) return msg.send("Get in a voice channel!")

            // Use filter for finding multiple
            const selection = stations.find(station => station?.callsign === msg.params[0] || `${station?.frequency} ${station?.band}` === `${msg.params[0]} ${msg.params[1]}`);

            // TODO: Ask the user which station they want give them number choices
            // if (selection.length >= 2) msg.send``

            const metadata = selection;

            if (!metadata) return msg.send("No station found!");

            const connection = await channel.join();
            connection.play(metadata.station_stream.find(s => s.type == "aac").url)

            const radioEmbed = new Embed()
                .setTitle("Radio")
                .setDescription(metadata.description)
                .setThumbnail(metadata.square_logo_large)
                .addFields(
                    { name: "Live", value: `[Listen here](${metadata.listen_live_url})`, inline: true },
                    { name: "Website", value: `[View here](${metadata.website})`, inline: true }
                )
                .setColor(metadata.primary_color);

            msg.send(radioEmbed);
        }
    };
