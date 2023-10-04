const { Router } = require('express')
const router = Router()

const UserController = require("../../controllers/users.controller")

const { isAuthorized } = require("../../middlewares/jwt.middleware")

const { authorization } = require("../../utils/passport")
//Retorna todos los cart
router.get('/', isAuthorized, authorization("admin"), UserController.getAllUsers)
router.post('/', isAuthorized, authorization("admin"), UserController.saveUser)

router.get("/:uid", isAuthorized, authorization("admin"), UserController.getUserById)

router.get("/:uid/cart", isAuthorized, UserController.getCart)

router.get("/addCart/:uid/:cid", isAuthorized, UserController.setCart)

module.exports = router;