const { errorResponse, successResponse } = require("../utils/utils")

const ProductRepository = require("../models/repositories/products.repository")

const productRepository = new ProductRepository()

class ProductController {
    static getAllProducts = async (req, res, next) => {

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
        data = await productRepository.getAllProducts(req.query.category, req.query.limit, req.query.page, req.query.price, req.query.sort)

        const response = successResponse(data.docs)
        res.status(200).json(response)
    }

    static getProductById = async (req, res, next) => {
        let data = await productRepository.getProductById(req.params.pid)
        const response = successResponse(data)
        res.status(200).json(response)
    }

    static saveProduct = async (req, res, next) => {
        const payload = req.body
        try {
            const newProduct = await productRepository.saveProduct(payload)

            const response = successResponse(newProduct)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController