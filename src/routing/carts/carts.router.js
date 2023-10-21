const { Router } = require('express')
const router = Router()

const CartController = require("../../controllers/carts.controller")


const { isAuthorized } = require("../../middlewares/jwt.middleware")

router.get('/', CartController.getAll)

router.post('/', CartController.save)

router.get("/:cid", CartController.getById)

router.post("/:cid/product/:pid", CartController.addProduct)

router.post("/purchase/:cid", CartController.confirmPurchase)


module.exports = router;