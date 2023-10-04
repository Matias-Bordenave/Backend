const { errorResponse, successResponse } = require("../utils/utils")
const UserRepository = require("../models/repositories/users.repository")

const userRepository = new UserRepository()

class UserController {
    static getAllUsers = async (req, res, next) => {
        try {
            const users = await userRepository.getAllUsers()
            const response = successResponse(users)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static saveUser = async (req, res, next) => {
        const payload = req.body
        try {

            const newUser = await userRepository.saveUser(payload)

            const response = successResponse(newUser)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static getUserById = async (req, res, next) => {
        try {
            const user = await userRepository.getUserById(req.params.uid)
            const response = successResponse(user)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static getCart = async (req, res, next) => {

        if (req.session.user._id != req.params.uid) {
            res.send({ err: "No permission" })
        } else {
            try {

                const cart = await userRepository.getCart(req.params.uid)

                try {
                    res.redirect("/api/carts/" + cart[0].cart.toString())
                } catch (err) {
                    res.redirect("/api/carts/newCartToUser/" + req.params.uid)
                }
            } catch (err) {
                next(err)
            }
        }
    }


    static setCart = async (req, res, next) => {
        try {
            const user = await userRepository.setCart(req.params.uid, req.params.cid)
            res.redirect("/api/users/" + user._id.toString() + "/cart")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController





