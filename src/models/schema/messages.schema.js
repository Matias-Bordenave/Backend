const mongoose = require('mongoose')

const messagesCollection = "messages"

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        index: true
    },
    message: { type: String },
    date: { tpye: Date }
})

const messageModel = mongoose.model(messagesCollection, messageSchema)

module.exports = messageModel