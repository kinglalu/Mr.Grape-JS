const { Sequelize } = require("sequelize");

module.exports = new Sequelize("sqlite::memory:", {
    dialect: "sqlite",
    storage: "db.sqlite",
    logging: false
});