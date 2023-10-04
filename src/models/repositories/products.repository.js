const { getDAOS } = require("../factories/products.daos.factory")
const SaveProductDTO = require("../dto/products.dto")
const productsDao = getDAOS()

class ProductRepository {
    constructor() {
        this.dao = productsDao
    }

    getAllProducts = async (category = "", limit = "", page = "", price = "", sort = "") => {
        return await this.dao.getAll(category, limit, page, price, sort)
    }

    getProductById = async (id) => {
        return await this.dao.getProductById(id)
    }

    saveProduct = async (payload) => {
        const productPayload = new SaveProductDTO(payload)
        return await this.dao.save(productPayload)
    }

    updateById = async (productId, product) => {
        return await this.dao.updateById(productId, product)
    }
}

module.exports = ProductRepository