const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

const productsCollection = "Products"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    description: { type: String },
    price: { type: Number },
    thumbnail: { type: Array },
    code: {
        type: String,
        index: true
    },
    stock: { type: Number },
    status: { type: Boolean },
    category: { type: String },
    owner: { type: String }
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection, productSchema)

module.exports = productModel