const { errorResponse, successResponse } = require("../utils/utils")
const CartService = require("../models/services/carts.service")
const ProductService = require("../models/services/products.service")
const TicketService = require('../models/services/tickets.service')

const cartService = new CartService()
const productService = new ProductService()
const ticketService = new TicketService()

class CartController {
    static getAll = async (req, res, next) => {
        try {
            const carts = await cartService.getAll()
            const response = successResponse(carts)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static getById = async (req, res, next) => {
        try {
            const cart = await cartService.getById(req.params.cid)
            const response = successResponse(cart)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static save = async (req, res, next) => {
        const payload = req.body
        const { name, products } = payload
        try {
            if (!name || !products) {
                throw new Error("Bad request")
            }

            const newCart = await cartService.save(payload)

            const response = successResponse(newCart)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static addProduct = async (req, res, next) => {
        try {

            if (req.session.rol == "premium") {
                let product = await productService.getById(req.params.pid)

                if (product.owner == req.session.user.email) {
                    res.send("No puedes agregar tu propio producto al carrito")
                }
            }
            if (!req.query.quantity) {
                req.query.quantity = "1"
            }
            let cart = await cartService.getById(req.params.cid)

            let check = cart.products.filter((prod) => prod.product.toString() == req.params.pid)

            if (check.length > 0) {
                let index = cart.products.indexOf(check[0])
                cart.products[index] = { product: req.params.pid, quantity: parseInt(req.query.quantity) }
            } else {
                cart.products.push({ product: req.params.pid, quantity: parseInt(req.query.quantity) })
            }

            let data = await cartService.updateById(req.params.cid, cart)
            const response = successResponse(data)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static deleteProduct = async (req, res, next) => {
        try {
            let cart = await cartService.getById(req.params.cid)

            let new_arr = cart.products.filter((prod) => prod.product.toString() != req.params.pid)

            cart.products = new_arr

            let data = await cartService.updateById(req.params.cid, cart)
            const response = successResponse(data)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static confirmPurchase = async (req, res, next) => {
        try {
            let cart = await cartService.getById(req.params.cid)
            let aux_c = cart
            let amount = 0

            await cart.products.map(async (item) => {
                let product = await productService.getById(item.product.toString())

                if (product.stock > item.quantity) {
                    console.log("se vendieron " + item.quantity + " unidades de " + product.title + ".")

                    let aux_p = product
                    aux_p.stock = product.stock - item.quantity

                    await productService.updateById(item.product.toString(), aux_p)

                    amount = amount + product.price
                    console.log("new amount " + amount)
                    let new_arr = aux_c.products.filter((prod) => prod.product.toString() != item.product.toString())
                    aux_c.products = new_arr
                    await cartService.updateById(req.params.cid, aux_c)
                }
            })

            if (amount > 0) {
                let new_ticket = {
                    amount: amount,
                    purchaser: req.session.user.email
                }

                let data = await ticketService.save(new_ticket)
                const response = successResponse(data)
                res.status(200).json(response)
            } else {
                const response = successResponse(cart)
                res.status(200).json(response)
            }

        } catch (err) {
            req.logger.error(err)
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