const {
    Sequelize: sequelize,
    Users, UserItems, Items,
    UserOres, OreStore,
    ShopItems, Craftable, Ores, Guilds
} = require("../../database");

UserItems.belongsTo(Items, { foreignKey: "item_id", as: "data" });
UserOres.belongsTo(OreStore, { foreignKey: "ore_id", as: "data" });

module.exports =
    class {
        constructor(alter = false) {
            this.alter = alter;
        }

        _addToItems(type, item) {
            item.type = type;
            return Items.upsert(item);
        }

        async _loadItems() {
            const TableUpserts = [
                ...ShopItems.map(item => this._addToItems("shop", item)),
                ...Craftable.map(craft => this._addToItems("craft", craft)),
                ...Ores.map(ore => OreStore.upsert(ore))
            ];

            await Promise.all(TableUpserts);
        }

        async init() {
            await sequelize.authenticate();
            await sequelize.sync({ alter: this.alter });
            await this._loadItems();
            await Users.load();
            await Guilds.load();
        }
    };