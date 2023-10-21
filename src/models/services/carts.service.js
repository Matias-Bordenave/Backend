const CONFIG = require("../../config/config")
const CartRepository = require("../repositories/carts.repository")

let cartsDao

class CartService {

    constructor() {
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

        return new CartRepository(cartsDao)
    }
}

module.exports = CartService