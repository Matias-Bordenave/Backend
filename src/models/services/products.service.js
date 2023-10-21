const CONFIG = require("../../config/config")
const ProductRepository = require("../repositories/products.repository")

let productsDao

class ProductService {
    constructor() {
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

        return new ProductRepository(productsDao)
    }
}

module.exports = ProductService