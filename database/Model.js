const { Model } = require("sequelize");
const sequelize = require("./Sequelize");

module.exports =
    class extends Model {
        static init(...opts) {
            super.init(...opts, { sequelize, timestamps: false, freezeTableName: true });
        }
    };