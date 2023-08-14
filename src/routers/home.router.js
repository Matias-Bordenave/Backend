const { Router } = require('express')
const router = Router()
const { isAuthorized } = require("../middlewares/jwt.middleware")

router.use(isAuthorized)

router.get('/home', (req, res) => {
    res.render('home', { data: req.session })
})


module.exports = router