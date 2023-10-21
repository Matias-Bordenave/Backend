
const { errorResponse, successResponse } = require("../utils/utils")

const ProductService = require("../models/services/products.service")

const productService = new ProductService()

class ProductController {
    static getAll = async (req, res, next) => {

        try {

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
            data = await productService.getAll(req.query.category, req.query.limit, req.query.page, req.query.price, req.query.sort)

            const response = successResponse(data.docs)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static getById = async (req, res, next) => {
        try {
            let data = await productService.getById(req.params.pid)
            const response = successResponse(data)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static save = async (req, res, next) => {
        const payload = req.body

        if (!payload.owner) {
            payload.owner = "admin"
        }
        try {
            const newProduct = await productService.save(payload)

            const response = successResponse(newProduct)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static deleteById = async (req, res, next) => {
        try {
            let data = await productService.deleteById(req.params.pid)
            const response = successResponse(data)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static updateById = async (req, res, next) => {
        const payload = req.body
        try {
            let data = await productService.updateById(req.params.pid, payload)
            const response = successResponse(data)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

}

module.exports = ProductController