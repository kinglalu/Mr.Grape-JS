// change this how ever you'd like, it's a command from my bot lo

module.exports =
    class extends Command {
        constructor() {
            super({
                name: "whoasked",
                cooldown: 2,
                aliases: ["wa"],
                description: "Who asked?"
            })
        }

        wait(time) {
            return new Promise(resolve => setTimeout(resolve, time * 1000));
        }

        async main(msg, args) {
            const thisMsg = await msg.send("<a:loadin:776803282731401246> Searching for who asked.")
            // the emojis are animated loading symbols, so make your own loading symbol and use it 
            await this.wait(5)
            thisMsg.edit("<a:loadin:776803282731401246> Requesting advanced searches from multiple APIs..")
            await this.wait(8)
            thisMsg.edit("<a:loadin:776803282731401246> Requesting advanced searches from multiple APIs...")
            await this.wait(10)
            thisMsg.edit("No results found, **maybe you should ~~shut up~~ not say that again.**")
        }
    }
