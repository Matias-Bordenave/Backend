
const { Router } = require('express')
const router = Router()
const path = require("path")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const { createHash, isValidPassword } = require("../../utils/bcrypt")

const userModel = require('../../models/schema/users.schema')

function authAdmin(req, res, next) {

    if (req.session.rol == "admin") {
        return next()
    }
    res.send("Denied access")
}

router.get('/login', (req, res) => {
    //res.sendFile(path.resolve(__dirname, "../public/login.html"))
    res.render("login", {})
})

/* router.post('/auth/login', passport.authenticate("login", { failureRedirect: "/auth/failedlogin" }), async (req, res) => { */

/* JWT */

router.post('/login', async (req, res) => {

    userModel.findOne({ email: req.body.email }).then((user) => {

        if (isValidPassword(user, req.body.password)) {
            req.session.email = user.email
            req.session.password = user.password
            req.session.age = user.age
            req.session.name = user.name
            req.session.rol = user.rol
            req.session.user = user

            let token = jwt.sign(JSON.stringify(user), 'mysecretcoderjwt')

            console.log("bearer " + token)

            res.cookie('jwtCookie', token, {
                maxAge: 60 * 60 * 100,
                httpOnly: true
            })
            res.redirect('/api/home')
        } else {
            res.send("Incorrect password")
        }
    })

})

router.get('/restore-password', (req, res) => {
    //res.sendFile(path.resolve(__dirname, "../public/login.html"))
    res.render("restore", {})
})

router.post('/restore-password', (req, res) => {
    userModel.updateOne({ email: req.body.email }, { $set: { password: createHash(req.body.password) } }).then((res) => {
        console.log(res)
    })

    res.redirect("/login")

})

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

/* router.post("/auth/register", passport.authenticate('register', { failureRedirect: "/auth/failedregister" }), (req, res) => { */

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

router.get("/users", authAdmin, (req, res) => {
    userModel.find({}).then((users) => {
        res.send(users)
    })
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