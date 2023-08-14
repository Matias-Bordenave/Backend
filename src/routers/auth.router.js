const { Router } = require('express')
const router = Router()
const path = require("path")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const { createHash, isValidPassword } = require("../utils/bcrypt")

const userModel = require('../dao/models/user.model.js')

function authAdmin(req, res, next) {

    if (req.session.rol == "admin") {
        return next()
    }
    res.send("Denied access")
}

router.get('/auth/login', (req, res) => {
    //res.sendFile(path.resolve(__dirname, "../public/login.html"))
    res.render("login", {})
})

router.post('/auth/login', passport.authenticate("login", { failureRedirect: "/auth/failedlogin" }), async (req, res) => {

    userModel.findOne({ email: req.body.email }).then((user) => {

        if (isValidPassword(user, req.body.password)) {
            req.session.email = user.email
            req.session.password = user.password
            req.session.age = user.age
            req.session.name = user.name
            req.session.rol = user.rol

            let token = jwt.sign(JSON.stringify(user), 'mysecretcoderjwt', {})

            console.log("bearer " + token)

            res.redirect('/home')
        } else {
            res.send("Incorrect password")
        }
    })

})

router.get('/auth/restore-password', (req, res) => {
    //res.sendFile(path.resolve(__dirname, "../public/login.html"))
    res.render("restore", {})
})

router.post('/auth/restore-password', (req, res) => {
    userModel.updateOne({ email: req.body.email }, { $set: { password: createHash(req.body.password) } }).then((res) => {
        console.log(res)
    })

    res.redirect("/auth/login")

})

router.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) res.send(err)
        res.redirect("/auth/login")
    })
})

router.get("/auth/register", (req, res) => {
    res.render("register", {})
})

router.get("/auth/failedregister", (req, res) => {
    res.send("Failed register")
})

router.get("/auth/failedlogin", (req, res) => {
    res.send("Failed login")
})

router.post("/auth/register", passport.authenticate('register', { failureRedirect: "/auth/failedregister" }), (req, res) => {
    res.redirect("/auth/login")
})

router.get("/profile", (req, res) => {
    res.render("profile", { data: req.session })
})

router.get("/users", authAdmin, (req, res) => {
    userModel.find({}).then((users) => {
        res.send(users)
    })
})

router.get("/auth/github", passport.authenticate("auth-github", { failureRedirect: "/failedlogin", scope: ['user:email'] }), (req, res) => {

})

router.get("/auth/github/callback", passport.authenticate("auth-github", { failureRedirect: "/loginfailed", scope: ['user:email'] }), (req, res) => {

    req.session.email = req.user.email
    req.session.password = req.user.password
    req.session.age = req.user.age
    req.session.name = req.user.name
    req.session.rol = req.user.rol

    res.redirect('/home')
})

router.get("/", (req, res) => {

})

module.exports = router;