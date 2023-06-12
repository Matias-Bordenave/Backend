const { Router } = require('express')
const router = Router()

const productManager = require("./classes/ProductManager.js")
const Product = require("../classes/Product.js")
const prManager = new productManager("../products.json")

//Retorna todos los productos
router.get('/api/products', (req, res) => {
    if (req.query.limit) {
        res.json(prManager.products.slice(0, parseInt(req.query.limit)))
    } else {
        res.json(prManager.getProducts())
    }
})

//Retorna un producto
router.get('/api/products/:pid', (req, res) => {
    res.json(prManager.getProductById(parseInt(req.params.pid)))
})

//Agrega un producto
router.post('/api/products', (req, res) => {
    let newProduct = new Product(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.status, req.body.stock, req.body.category)
    prManager.addProduct(newProduct)
})

//Modifica un producto
router.put('/api/products/:pid', (req, res) => {
    let properties = Object.keys(req.body)
    let newValues = Object.values(req.body)

    let i = 0

    while (i < properties.length) {
        prManager.updateProductById(req.params.pid, properties[i], newValues[i])
        i++
    }
})

//Elimina un producto
router.delete('/api/products/:pid', (req, res) => {
    prManager.deleteProductById(req.params.pid)
})

module.exports = router;