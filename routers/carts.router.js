const { Router } = require('express')
const router = Router()

const CartManager = require('../classes/CartManager')

const crManager = new CartManager("../carts.json")

//Retorna todos los cart
router.get('/api/carts', (req, res) => {
    res.json(crManager.getCarts())
})

//Retorna la lista de productos en un cart 
router.get('/api/carts/:cid', (req, res) => {

    let cart = crManager.getCartById(req.params.cid)

    if (cart != undefined) {
        console.log(cart)
        res.json(cart.products)
    } else {
        res.send("No existe el cart con el id buscado")
    }

})

//Agrega un Cart
router.post('/api/carts', (req, res) => {
    crManager.addCart(req.query.name)
    res.send("OK")
})

//Agrega un producto a un carrito
router.post('/api/carts/:cid/product/:pid', (req, res) => {
    if (!req.query.quantity) {
        req.query.quantity = "1"
    } 

    crManager.addProductToCart(req.params.cid, req.params.pid, req.query.quantity)
    res.send("OK")
})

//Modifica un cart
router.put('/api/carts/:cid', (req, res) => {
})

//Elimina un cart
router.delete('/api/carts/:cid', (req, res) => {
})

module.exports = router;