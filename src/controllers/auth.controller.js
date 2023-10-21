const { errorResponse, successResponse } = require("../utils/utils")

const { createHash, isValidPassword } = require("../utils/bcrypt")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const CONFIG = require("../config/config")

const UserService = require("../models/services/users.service")

const userService = new UserService()

class AuthController {

    static login = async (req, res, next) => {

        const user = await userService.getByEmail(req.body.email)

        if (isValidPassword(user, req.body.password)) {
            req.session.email = user.email
            req.session.password = user.password
            req.session.age = user.age
            req.session.name = user.name
            req.session.rol = user.rol
            req.session.user = user

            let token = jwt.sign(JSON.stringify(user), CONFIG.jwt.SECRET)

            console.log("bearer " + token)

            res.cookie(CONFIG.jwt.COOKIE, token, {
                maxAge: 60 * 60 * 100,
                httpOnly: true
            })
            res.redirect('/api/home')
        } else {
            res.send("Incorrect password")
        }
    }

    static restorePassword = async (req, res, next) => {

        const user = await userService.getByEmail(req.body.email)

        if (user.email == req.body.email) {
            res.send("La nueva clave no puede ser igual a la clave anterior")
        } else {
            user.email = req.body.email

            await userService.updateById(user._id.toString(), user)
        }

        res.redirect("/login")
    }
}

module.exports = AuthController