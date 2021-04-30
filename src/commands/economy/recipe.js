// FIXED COMMAND

const { Op } = require("sequelize");
const { EconomyCommand } = require("../../../lib");

module.exports =
    class extends EconomyCommand {
        constructor(...args) {
            super(...args, {
                name: "recipe",
                type: "economy",
                description: "Get a recipe for an item.",
                usage: "<recipe>",
                saying: "Chill on the crafting.",
                cooldown: 2
            });
        }

        format(string) {
            return string.split(" ")
                .map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
                .join(" ");
        }

        async main(msg) {
            if (!msg.params.length) {
                const getRecipes = await this.eco.shop.findAll({ where: { type: "craft" } });

                const recipes = getRecipes.sort((a, b) => a.price - b.price)
                    .map(item =>
                        [`${this.format(item.name)}`, `${item.description}\nWorth: **${item.price}:star:s**`]
                    );

                msg.paginate({ title: "Recipes" }, recipes, 5);
            }
            else {
                const recipe = await this.eco.shop.findOne({
                    where: {
                        type: "craft",
                        [Op.or]: {
                            name: msg.params[0],
                            alias: msg.params[0]
                        }
                    }
                });

                if (!recipe) return msg.send`${recipe} can't be crafted`;

                const ingredients = Object.entries(recipe.recipe).map(r => [this.format(r[0]), r[1]]);

                msg.paginate({ title: this.format(recipe.name) }, ingredients, 5);
            }
        }
    };
