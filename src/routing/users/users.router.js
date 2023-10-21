const { Router } = require('express')
const router = Router()

const UserController = require("../../controllers/users.controller")

const { isAuthorized } = require("../../middlewares/jwt.middleware")

const { authorization } = require("../../utils/passport")
//Retorna todos los cart
router.get('/', isAuthorized, authorization("admin"), UserController.getAll)
router.post('/', isAuthorized, authorization("admin"), UserController.save)

router.get("/:uid", UserController.getById)

router.get("/cart/:uid", UserController.getCart)

module.exports = router;