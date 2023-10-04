const mongoose = require('mongoose')
require("./carts.schema")
const mongoosePaginate = require("mongoose-paginate-v2")

const usersCollection = "Users"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    rol: {
        type: String,
        enum: ["user", "admin"]
    },
    carts: {
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Carts"
                }
            }
        ],
        default: []
    }
})

userSchema.pre("find", function () {
    this.populate("carts.cart")
})

userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model(usersCollection, userSchema)

module.exports = userModel