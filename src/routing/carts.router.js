const { Router } = require('express')
const router = Router()
const path = require("path")

const {
    addProductToCartController,
    getCartsController,
    getCartByIdController,
    createCartController,
    deleteProductFromCartController } = require('../controllers/carts.controller')


//Retorna todos los cart
router.get('/carts', getCartsController)

//Retorna la lista de productos en un cart 
router.get('/carts/:cid', getCartByIdController)

//Agrega un Cart
router.post('/carts', createCartController)

//Agrega un producto a un carrito
router.post('/carts/:cid/product/:pid', addProductToCartController
)

//Elimina un producto a un carrito
router.delete('/carts/:cid/product/:pid', deleteProductFromCartController)

//Modifica un cart
router.put('/carts/:cid', (req, res) => {
})

//Elimina un cart
router.delete('/carts/:cid', (req, res) => {
})

module.exports = router;