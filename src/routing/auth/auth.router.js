
const { Router } = require('express')
const router = Router()
const path = require("path")

const passport = require("passport")

const { createHash, isValidPassword } = require("../../utils/bcrypt")

const AuthController = require("../../controllers/auth.controller")

function authAdmin(req, res, next) {

    if (req.session.rol == "admin") {
        return next()
    }
    res.send("Denied access")
}

router.get('/login', (req, res) => {
    res.render("login", {})
})

/* JWT */
router.post('/login', AuthController.login)

router.get('/restore-password', (req, res) => {
    res.render("restore", {})
})

router.post('/restore-password', AuthController.restorePassword)

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        console.log("session deleted")
        if (err) res.send(err)
        res.redirect("/api/auth/login")
    })
})

router.get("/register", (req, res) => {
    res.render("register", {})
})

router.get("/failedregister", (req, res) => {
    res.send("Failed register")
})

router.get("/failedlogin", (req, res) => {
    res.send("Failed login")
})

/* JWT */

router.post("/auth/register", (req, res) => {

    res.redirect("/login")
})

router.get("/profile", (req, res) => {
    res.render("profile", { data: req.session })
})

router.get("/current", (req, res) => {
    res.send({ status: 200, payload: req.session })
})

router.get("/github", passport.authenticate("auth-github", { failureRedirect: "/failedlogin", scope: ['user:email'] }), (req, res) => {

})

router.get("/github/callback", passport.authenticate("auth-github", { failureRedirect: "/loginfailed", scope: ['user:email'] }), (req, res) => {

    req.session.email = req.user.email
    req.session.password = req.user.password
    req.session.age = req.user.age
    req.session.name = req.user.name
    req.session.rol = req.user.rol

    res.redirect('/api/home')
})

router.get("/", (req, res) => {

})

module.exports = router;