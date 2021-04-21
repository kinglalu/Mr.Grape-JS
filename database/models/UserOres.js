const { DataTypes } = require("sequelize");
const Ores = require("./Ores");
const Model = require("../Model");

class UserOres extends Model {
    static async addOre(id, ore, amt, rf = false) {
        const userOre = await this.findOne({
            where: {
                user_id: id,
                ore_id: ore.id,
                refined: rf
            }
        });

        if (userOre) {
            userOre.amount += amt;
            if (!userOre.amount) return userOre.destroy();
            return userOre.save();
        }

        return await this.create({ user_id: id, ore_id: ore.id, amount: amt, refined: rf });
    }

    static async getOre(id, oreName, rf = false) {
        const ore = await Ores.findOne({ where: { name: oreName } });

        if (!ore) return false;

        const userOre = await this.findOne({
            where: {
                user_id: id,
                ore_id: ore.id,
                refined: rf
            }
        });
        
        return userOre;
    }

    async refine(amount = this.amount) {
        const refined = await UserOres.findOne({ where: { user_id: this.user_id, ore_id: this.ore_id, refined: true } });

        if (!refined && amount === this.amount) {
            this.refined = true;
            return this.save();
        }

        this.amount -= amount;

        if (refined) {
            refined.amount += amount;
            refined.save();
        }
        else await UserOres.create({ user_id: this.user_id, ore_id: this.ore_id, amount: amount, refined: true });

        if (!this.amount) return this.destroy();
        return this.save();
    }
}

UserOres.init({
    user_id: DataTypes.STRING,
    ore_id: DataTypes.INTEGER,
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    refined: DataTypes.BOOLEAN
});

module.exports = UserOres;