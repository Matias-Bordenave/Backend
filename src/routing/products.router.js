const { Router } = require('express')
const router = Router()

const {
    getProductsController,
    getProductByIdController,
    createProductController } = require('../controllers/products.controller')


//Retorna todos los productos
router.get('/products', getProductsController)


//Retorna un producto
router.get('/products/:pid', getProductByIdController)

//Agrega un producto
router.post('/products', createProductController)

//Modifica un producto
router.put('/products/:pid', (req, res) => {
    let properties = Object.keys(req.body)
    let newValues = Object.values(req.body)

    let i = 0

    while (i < properties.length) {
        //prManager.updateProductById(req.params.pid, properties[i], newValues[i])
        i++
    }
})

//Elimina un producto
router.delete('/api/products/:pid', (req, res) => {
    //prManager.deleteProductById(req.params.pid)
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