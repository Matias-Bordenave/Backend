const { Router } = require('express')
const router = Router()



const { isAuthorized } = require("../../middlewares/jwt.middleware")


router.get('/chat', isAuthorized, (req, res) => {
    res.render('chat', { style: "style.css" })
})

module.exports = router;


