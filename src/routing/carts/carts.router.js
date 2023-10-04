const { Router } = require('express')
const router = Router()

const CartController = require("../../controllers/carts.controller")


const { isAuthorized } = require("../../middlewares/jwt.middleware")

//Retorna todos los cart
/* router.get('/', isAuthorized, CartController.getAllCarts)
router.post('/', isAuthorized, CartController.saveCart)

router.get("/:cid", CartController.getCartById)

router.post("/:cid/product/:pid", isAuthorized, CartController.addProduct)

router.get("/newCartToUser/:uid", isAuthorized, CartController.newCartToUser ) */

router.post("/purchase/:cid", CartController.confirmPurchase)


module.exports = router;

