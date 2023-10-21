const { errorResponse, successResponse } = require("../utils/utils")
const UserService = require("../models/services/users.service")
const CartService = require("../models/services/carts.service")

const userService = new UserService()
const cartService = new CartService()

class UserController {
    static getAll = async (req, res, next) => {
        try {
            const users = await userService.getAll()
            const response = successResponse(users)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static save = async (req, res, next) => {
        const payload = req.body
        try {

            const newUser = await userService.save(payload)

            const response = successResponse(newUser)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static getById = async (req, res, next) => {
        try {
            const user = await userService.getById(req.params.uid)
            const response = successResponse(user)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static getCart = async (req, res, next) => {

        if (req.session.user._id != req.params.uid) {
            res.send({ err: "No permission" })
        } else {
            try {

                const carts = await userService.getCart(req.params.uid)

                if (carts.length > 0) {
                    res.redirect("/api/carts/" + carts[0].cart.toString())
                } else {
                    let new_cart = {
                        name: req.params.uid,
                        products: []
                    }

                    const cart = await cartService.save(new_cart)
                    let cartId = cart._id.toString()

                    const user = await userService.getById(req.params.uid)
                    user.carts.push({ cart: cartId })

                    await userService.updateById(req.params.uid, user)
                    res.redirect("/api/carts/" + cartId)
                }
            } catch (err) {
                req.logger.error(err)
                next(err)
            }
        }
    }
}

module.exports = UserController