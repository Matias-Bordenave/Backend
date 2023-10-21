const SaveProductDTO = require("../dto/products.dto")

class ProductRepository {
    constructor(productsDao) {
        this.dao = productsDao
    }

    getAll = async (category = "", limit = "", page = "", price = "", sort = "") => {
        return await this.dao.getAll(category, limit, page, price, sort)
    }

    getById = async (id) => {
        return await this.dao.getById(id)
    }

    save = async (payload) => {
        const productPayload = new SaveProductDTO(payload)
        return await this.dao.save(productPayload)
    }

    updateById = async (productId, product) => {
        return await this.dao.updateById(productId, product)
    }

    deleteById = async (productId) => {
        return await this.dao.deleteById(productId)
    }
}

module.exports = ProductRepository