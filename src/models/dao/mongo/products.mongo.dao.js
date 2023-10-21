const productModel = require('../../schema/products.schema')
const MongoManager = require("../../db/manager/mongo.manager")

class ProductsMongoDao {
    constructor() {
        MongoManager.start()
    }

    getAll = async (category = "", limit = "", page = "", price = "", sort = "") => {
        if (category != "") {
            return await productModel.paginate({ category: category }, { limit: parseInt(limit), page: parseInt(page), sort: { price: parseInt(sort) } })
        } else {
            return await productModel.paginate({}, { limit: parseInt(limit), page: parseInt(page), sort: { price: parseInt(sort) } })
        }
    }

    getById = async (id) => {
        return await productModel.findOne({ _id: id }).lean()
    }

    save = async (payload) => {
        const newProduct = await productModel.create(payload)
        return newProduct
    }

    updateById = async (productId, product) => {
        return await productModel.updateOne({ _id: productId }, product)
    }

    deleteById = async (productId) => {
        return await productModel.deleteOne({ _id: productId })
    }
}

module.exports = ProductsMongoDao