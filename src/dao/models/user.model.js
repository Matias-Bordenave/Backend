const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

const userssCollection = "Users"

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
    }
})

userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model(userssCollection, userSchema)

module.exports = userModel