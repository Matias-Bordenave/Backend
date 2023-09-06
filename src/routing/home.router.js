const { Router } = require('express')
const router = Router()

const passport = require("passport")

const { passportCall, authorization } = require("../utils/passport")
/* const { isAuthorized } = require("../middlewares/jwt.middleware")
 */
router.get('/home', passportCall('jwt'), authorization("admin"), (req, res) => {
    res.render('home', { data: req.session })
})




module.exports = router