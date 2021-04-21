const { Users, UserItems, Items, OreStore, UserOres } = require("../../database");
const Command = require("./Command");

module.exports =
    class extends Command {
        get eco() {
            return {
                users: Users,
                items: UserItems,
                shop: Items,
                oreStore: OreStore,
                ores: UserOres
            };
        }
        
        randomize(num) {
            return Math.floor(Math.random() * num);
        }

        getNameAmt({ params }) {
            const number = params.find(e => +e);
            return [params.filter(i => i !== number).join(" "), number ? +number : 1];
        }

        format(name, amount) {
            return `${amount} ${name}${amount > 1 ? "s" : ""}`;
        }
    };