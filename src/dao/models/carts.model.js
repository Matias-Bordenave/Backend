const mongoose = require('mongoose')

const cartsCollection = "Carts"

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        index: true
    },
    name: {
        type: String,
        index: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                },
                quantity: Number
            }
        ],
        default: []
    }
})

cartSchema.pre("find",function() {
    this.populate("products.product")
})

const cartModel = mongoose.model(cartsCollection, cartSchema)

module.exports = cartModel 