const CONFIG = require("../../config/config")

let productsDao

switch (CONFIG.DATASOURCE) {
    case "MEMORY": {
        const ProductsMemoryDao = require("../dao/memory/products.memory.dao")
        productsDao = new ProductsMemoryDao()
        break
    }
    case "MONGO": {
        const ProductsMongoDao = require("../dao/mongo/products.mongo.dao")
        productsDao = new ProductsMongoDao()
        break
    }
    default:
        throw new Error("Param not found")
}

const getDAOS = () => {
    return (
        productsDao
    )
}

module.exports = {
    getDAOS
}