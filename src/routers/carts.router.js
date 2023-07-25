const { Router } = require('express')
const router = Router()

const CartManager = require('../dao/fileSystem/CartManager')

const crManager = new CartManager("../carts.json")

const cartModel = require("../dao/models/carts.model")
const productModel = require("../dao/models/products.model")

//Retorna todos los cart
router.get('/api/carts', (req, res) => {
    cartModel.find().then((products) => {
        res.json(products)
    }).catch((err) => {
        console.log(err)
    })
})

//Retorna la lista de productos en un cart 
router.get('/api/carts/:cid', (req, res) => {

    cartModel.find({ id: parseInt(req.params.cid) }).then((products) => {
        if (products.length > 0) {
            res.json(products)
        } else {
            res.send("No existe el cart con el id buscado")
        }
    }).catch((err) => {
        console.log(err)
    })

})

//Agrega un Cart
router.post('/api/carts', (req, res) => {
    crManager.addCart(req.query.name)
    let newCart = crManager.getCartByName(req.query.name)

    console.log(newCart)
    //cartModel.create(newCart)

    res.send("OK")
})

//Agrega un producto a un carrito
router.post('/api/carts/:cid/product/:pid', async (req, res) => {
    if (!req.query.quantity) {
        req.query.quantity = "1"
    }

    //crManager.addProductToCart(req.params.cid, req.params.pid, req.query.quantity)

    let pr_id = await productModel.find({ id: parseInt(req.params.pid) }).then((res) => {
        return res[0]._id.toString()
    }).catch((err) => {
        console.log(err)
    })

    let cart = await cartModel.find({id: parseInt(req.params.cid)}).then((res)=>{
        return res[0]
    }).catch((err)=>{c
        return err
    })

    let c_products = cart.products.filter((product) => { product._id.toString() == pr_id })

    cart.products.push({product: pr_id, quantity: parseInt(req.query.quantity)})

    cartModel.updateOne({id: parseInt(req.params.cid)}, cart).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
})

//Elimina un producto a un carrito
router.delete('/api/carts/:cid/product/:pid', async (req, res) => {

    //crManager.addProductToCart(req.params.cid, req.params.pid, req.query.quantity)

    let pr_id = await productModel.find({ id: parseInt(req.params.pid) }).then((res) => {
        return res[0]._id.toString()
    }).catch((err) => {
        console.log(err)
    })

    let cart = await cartModel.find({id: parseInt(req.params.cid)}).then((res)=>{
        return res[0]
    }).catch((err)=>{c
        return err
    })

    let c_products = cart.products.filter((product) => { product._id.toString() != pr_id })

    cart.products = c_products

    cartModel.updateOne({id: parseInt(req.params.cid)}, cart).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
})

//Modifica un cart
router.put('/api/carts/:cid', (req, res) => {
})

//Elimina un cart
router.delete('/api/carts/:cid', (req, res) => {
})

module.exports = router;