module.exports = {
    ...require("./commands"), ...require("./events"), ...require("./utils"),
    Client: require("./Client"),
    Embed: require("./extensions/Embed").Embed
};