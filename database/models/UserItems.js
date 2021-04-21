const { DataTypes } = require("sequelize");
const Shop = require("./Items");
const Model = require("../Model");

class UserItems extends Model {

    static async addItem(id, itemObj, amt) {
        const userItem = await this.findOne({
            where: { user_id: id, item_id: itemObj.id }
        });

        if (userItem) {
            userItem.amount += amt;
            if (!userItem.amount) return userItem.destroy();
            return userItem.save();
        }

        return await this.create({ user_id: id, item_id: itemObj.id, amount: amt });
    }

    static async getItem(id, itemName) {
        const item = await Shop.findOne({ where: { name: itemName } });

        if (!item) return false;

        const userItems = await this.findOne({
            where: { user_id: id, item_id: item.id }
        });

        return userItems ? userItems.amount : 0;
    }

    static async deleteItem(id, itemName, amt = 1) {
        const item = await Shop.findOne({ where: { name: itemName } });

        if (!item) throw new Error("That's not a valid item to delete!");

        this.addItem(id, item, -amt);
    }
}

UserItems.init({
    user_id: DataTypes.STRING,
    item_id: DataTypes.STRING,
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = UserItems;