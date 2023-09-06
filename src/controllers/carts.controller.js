const cartModel = require('../dao/models/carts.model')
const productModel = require('../dao/models/products.model')
const { getCartByIdService, addProductToCartService, getCartsService, createCartService } = require('../services/carts.service')
const { getProductDBId } = require('../services/products.service')

const addProductToCartController = async (req, res) => {
    if (!req.query.quantity) {
        req.query.quantity = "1"
    }

    let data = await addProductToCartService(req.params.cid, req.params.pid, req.query.quantity)

    return data

}

const getCartsController = async (req, res) => {

    let data = await getCartsService()

    res.send(data)
}

const getCartByIdController = async (req, res) => {

    let data = await getCartByIdService(req.params.cid)

    res.send({ data: data })

}

const createCartController = async (req, res) => {
    let newCart = { id: 3, name: req.query.name, products: [] }

    let data = await createCartService(newCart)

    res.send({ data: data })
}

const deleteProductFromCartController = (req, res) => {

    let data = deleteProductFromCartService(cartId, productId)

    res.send({ data: data })
}

module.exports = {
    addProductToCartController,
    getCartsController,
    getCartByIdController,
    createCartController,
    deleteProductFromCartController
}