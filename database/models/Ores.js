const { DataTypes } = require("sequelize");
const { OrePrices } = require("../assets");
const Model = require("../Model");

class OreStore extends Model { }

OreStore.init({
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    tier: DataTypes.INTEGER,
    price: {
        type: DataTypes.VIRTUAL,
        get() {
            return OrePrices[this.tier - 1];
        }
    }
});

module.exports = OreStore;