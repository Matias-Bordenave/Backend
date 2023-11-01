const { error } = require("console")
const CustomError = require("../utils/customError")
const { EError } = require("../utils/EError")

const errMiddleware = (error, req, res, next) => {
    console.log("Ingreso al middleware")
    switch (error.code) {
        case EError.INVALID_TYPES_ERROR:
            res.send({ status: "Error", error: error.name })
            break
        default:
            res.send({ status: "Error", error: "Unknown error" })
    }
}

module.exports = errMiddleware