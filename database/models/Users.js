const { DataTypes } = require("sequelize");
const Model = require("../CachedModel");

class Users extends Model {
    
    static getBalance(id) {
        const user = this.cache.get(id);
        return user ? user.balance : 0;
    }

    static async add(id, amount) {
        if (!amount) return;
        const user = this.cache.get(id);
        if (user) {
            user.balance += amount;
            return user.save();
        }
        const newPerson = await this.create({ id: id, balance: amount });
        this.cache.set(id, newPerson);
        return newPerson;
    }
}

Users.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

module.exports = Users;