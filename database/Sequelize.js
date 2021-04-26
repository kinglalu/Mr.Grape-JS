const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
