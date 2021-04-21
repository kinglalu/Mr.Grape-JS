const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE || process.env.DATABASE_URL, { logging: false });