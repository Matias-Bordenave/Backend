const cartModel = require('../../schema/carts.schema')
const MongoManager = require("../../db/manager/mongo.manager")

class CartsMongoDao {
    constructor() {
        MongoManager.start()
    }

    getAll = async () => {
        return await cartModel.find().lean()
    }

    save = async (payload) => {
        const newCart = await cartModel.create(payload)
        return newCart
    }

    getById = async (id) => {
        return await cartModel.findOne({ _id: id }).lean()
    }

    updateById = async (cartId, newCart) => {
        return await cartModel.updateOne({ _id: cartId }, newCart)
    }

    deleteById = async (cartId) => {
        return await cartModel.deleteOne({ _id: cartId })
    }
}

module.exports = CartsMongoDao