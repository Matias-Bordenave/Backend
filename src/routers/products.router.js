const { Router } = require('express')
const router = Router()

const productManager = require("../dao/fileSystem/ProductManager")
const Product = require("../dao/fileSystem/Product.js")
const productModel = require('../dao/models/products.model.js')
const prManager = new productManager("../products.json")


//Retorna todos los productos
router.get('/products', async (req, res) => {

    res.cookie("Cookie",'Informacion de la Cookie', {signed:true})

    let products = []

    if (!req.query.limit) {
        req.query.limit = "2"
    }

    if (!req.query.page) {
        req.query.page = "1"
    }

    if (req.query.sort) {
        if (req.query.sort == "asc") {
            req.query.sort = "1"
        } else if (req.query.sort == "desc") {
            req.query.sort = "-1"
        }
    } else {
        req.query.sort = "-1"
    }

    if (req.query.category) {
        products = await productModel.paginate({ category: req.query.category }, { limit: parseInt(req.query.limit), page: parseInt(req.query.page), sort: { price: parseInt(req.query.sort) } })
    } else {
        products = await productModel.paginate({}, { limit: parseInt(req.query.limit), page: parseInt(req.query.page), sort: { price: parseInt(req.query.sort) } })
    }

    console.log(products.docs)

    res.render('home', {
        products: products.docs,
        style: "style.css"
    })

})


//Retorna un producto
router.get('/api/products/:pid', (req, res) => {
    productModel.findOne({ id: req.params.pid })
        .then((product) => {
            res.send(product)
        })
        .catch((err) => {
            res.send(err)
        })
})

//Agrega un producto
router.post('/api/products', (req, res) => {
    let newProduct = new Product(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.status, req.body.stock, req.body.category)
    prManager.addProduct(newProduct)

    let newproductWithId = prManager.getProductByCode(newProduct.code)

    productModel.create(newproductWithId)
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
    productModel.delete({ id: parseInt(req.params.pid) })
})

//WEBSOCKETS

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        style: "style.css"
    })
})

module.exports = router;

//
//
//METODOS CON FILE SYSTEM

/* //Retorna todos los productos --
router.get('/products', (req, res) => {
    console.log(Product.find())
    if (req.query.limit) {
        res.render('home', {
            products: prManager.products.slice(0, parseInt(req.query.limit)),
            style: "style.css"
        })
    } else {
        res.render('home', {
            products: prManager.getProducts(),
            style: "style.css"
        })
    }
}) 
router.get('/api/products', (req, res) => {
    if (req.query.limit) {
        res.json(prManager.products.slice(0, parseInt(req.query.limit)))
    } else {
        res.json(prManager.getProducts())
    }
})



*/