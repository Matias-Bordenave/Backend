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

    getCartById = async (id) => {
        return await cartModel.findOne({ _id: id }).lean()
    }

    addProduct = async (cartId, productId, quantity) => {
        let cart = await this.getCartById(cartId)
        let check = cart.products.filter((product) => product.product.toString() == productId)

        if (check.length > 0) {
            let index = cart.products.indexOf(check[0])
            cart.products[index] = { product: productId, quantity: parseInt(quantity) }
        } else {
            cart.products.push({ product: productId, quantity: parseInt(quantity) })
        }
        await cartModel.updateOne({ _id: cartId }, cart).then((res) => {
        }).catch((err) => {
            return false
        })

        return cart
    }

    updateById = async (cartId, newCart) => {
        return await cartModel.updateOne({ _id: cartId }, newCart)
    }
}

module.exports = CartsMongoDao