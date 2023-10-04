const CONFIG = require("../../config/config")

let cartsDao

switch (CONFIG.DATASOURCE) {
    case "MEMORY": {
        const CartsMemoryDao = require("../dao/memory/carts.memory.dao")
        cartsDao = new CartsMemoryDao()
        break
    }
    case "MONGO": {
        const CartsMongoDao = require("../dao/mongo/carts.mongo.dao")
        cartsDao = new CartsMongoDao()
        break
    }
    default:
        throw new Error("Param not found")
}

const getDAOS = () => {
    return (
        cartsDao
    )
}

module.exports = {
    getDAOS
}