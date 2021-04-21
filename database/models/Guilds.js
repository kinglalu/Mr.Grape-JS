const { DataTypes } = require("sequelize");
const Model = require("../CachedModel");

class Guilds extends Model { }

Guilds.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    prefix: DataTypes.STRING
});

module.exports = Guilds;