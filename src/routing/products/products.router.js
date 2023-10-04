const { Router } = require('express')
const router = Router()
const { authorization } = require("../../utils/passport")
const { isAuthorized } = require("../../middlewares/jwt.middleware")
const compression = require("express-compression")

const ProductController = require("../../controllers/products.controller")

//Retorna todos los productos
router.get('/', compression({ brotli: { enabled: true, zlib: {} } }), ProductController.getAllProducts)

//Retorna un producto
router.get('/:pid', ProductController.getProductById)

//Agrega un producto
router.post('/', isAuthorized, authorization("admin"), ProductController.saveProduct)

//Actualiza un producto
router.put('/:pid', isAuthorized, authorization("admin"), ProductController.saveProduct)

//Elimina un producto
router.delete('/:pid', isAuthorized, authorization("admin"), ProductController.saveProduct)

//Modifica un producto
/* router.put('/:pid', (req, res) => {
    let properties = Object.keys(req.body)
    let newValues = Object.values(req.body)

    let i = 0

    while (i < properties.length) {
        //prManager.updateProductById(req.params.pid, properties[i], newValues[i])
        i++
    }
}) */

module.exports = router;