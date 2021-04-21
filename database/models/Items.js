const { DataTypes } = require("sequelize");
const { Recipes } = require("../assets");
const Model = require("../Model");

class Items extends Model { }

Items.init({
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ["shop", "craft"]
    },
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    alias: DataTypes.STRING,
    recipe: {
        type: DataTypes.VIRTUAL,
        get() {
            return Recipes[this.name] || null;
        },
        set() {
            throw new Error("You can set recipes in the assets folder!");
        }
    }
});

module.exports = Items;