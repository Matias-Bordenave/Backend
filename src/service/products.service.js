const productModel = require('../dao/models/products.model')
const Product = require("../dao/fileSystem/Product.js")

const getProductDBIdService = async (id) => {
    let data = await productModel.find({ id: id })
        .then((res) => {
            return res[0]._id.toString()
        })
        .catch((err) => {
            console.log(err)
        })

    return data
}

const getProductsService = async (category = "", limit = "", page = "", price = "", sort = "") => {
    let data = []
    if (category != "") {
        data = await productModel.paginate({ category: category }, { limit: parseInt(limit), page: parseInt(page), sort: { price: parseInt(sort) } })
    } else {
        data = await productModel.paginate({}, { limit: parseInt(limit), page: parseInt(page), sort: { price: parseInt(sort) } })
    }

    return data
}

const getProductByIdService = async (id) => {
    console.log(id)
    let data = await productModel.findOne({ id: id })
        .then((product) => {
            return product
        })
        .catch((err) => {
            console.log(err)
        })
    return data
}

const createProductService = (title = "", description = "", price = "", thumbnail = "", code = "", status = "", stock = "", category = "") => {
    let newProduct = new Product(title, description, price, thumbnail, code, status, stock, category)
    productModel.create(newProduct)
}