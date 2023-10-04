const CONFIG = require("../../config/config")

let usersDao

switch (CONFIG.DATASOURCE) {
    case "MEMORY": {
        const UsersMemoryDao = require("../dao/memory/users.memory.dao")
        cartsDao = new UsersMemoryDao()
        break
    }
    case "MONGO": {
        const UsersMongoDao = require("../dao/mongo/users.mongo.dao")
        usersDao = new UsersMongoDao()
        break
    }
    default:
        throw new Error("Param not found")
}

const getDAOS = () => {
    return (
        usersDao
    )
}

module.exports = {
    getDAOS
}