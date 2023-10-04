const { errorResponse, successResponse } = require("../utils/utils")
const CartRepository = require("../models/repositories/carts.repository")

const cartRepository = new CartRepository()

class CartController {
    static getAllCarts = async (req, res, next) => {
        try {
            const carts = await cartRepository.getAllCarts()
            const response = successResponse(carts)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static getCartById = async (req, res, next) => {
        try {
            const cart = await cartRepository.getCartById(req.params.cid)
            const response = successResponse(cart)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static saveCart = async (req, res, next) => {
        const payload = req.body
        const { name, products } = payload
        try {
            if (!name || !products) {
                throw new Error("Bad request")
            }

            const newCart = await cartRepository.saveCart(payload)

            const response = successResponse(newCart)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static newCartToUser = async (req, res, next) => {
        try {
            const payload = req
            payload.name = req.params.uid
            payload.products = []

            const newCart = await cartRepository.saveCart(payload)

            res.redirect("/api/users/addCart/" + req.params.uid + "/" + newCart._id.toString())
        } catch (err) {
            next(err)
        }
    }

    static addProduct = async (req, res, next) => {

        try {
            if (!req.query.quantity) {
                req.query.quantity = "1"
            }

            let data = await cartRepository.addProduct(req.params.cid, req.params.pid, req.query.quantity)
            const response = successResponse(data)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static confirmPurchase = async (req, res, next) => {
        try {
            let cart = await cartRepository.confirmPurchase(req.params.cid)
            const response = successResponse(cart)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CartController

/* const addProductToCartController = async (req, res) => {
    if (!req.query.quantity) {
        req.query.quantity = "1"
    }

    let data = await addProductToCartService(req.params.cid, req.params.pid, req.query.quantity)

    return data

}

const getAllCarts = async (req, res) => {

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
} */