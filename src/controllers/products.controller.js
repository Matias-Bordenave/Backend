

const {
    getProductsService,
    getProductByIdService,
    createProductService } = require('../services/products.service')



const getProductsController = async (req, res) => {

    res.cookie("Cookie", 'Informacion de la Cookie', { signed: true })

    let data = []

    if (!req.query.category) {
        req.query.category = ""
    }

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

    data = await getProductsService(req.query.category, req.query.limit, req.query.page, req.query.price, req.query.sort)

    console.log(data.docs)

    res.send(data.docs)
    /* res.render('products', {
        products: [{ title: "prod1" }, { title: "prod2" }],
        style: "style.css"
    }) */
}

const getProductByIdController = async (req, res) => {
    let data = await getProductByIdService(req.params.pid)
    res.send(data)
}

const createProductController = async (req, res) => {
    let data = await createProductService(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.status, req.body.stock, req.body.category)
    return data
}

module.exports = {
    getProductsController,
    getProductByIdController,
    createProductController
}