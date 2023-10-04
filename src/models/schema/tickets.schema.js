const mongoose = require('mongoose')
require("./tickets.schema")

const ticketsCollection = "Tickets"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        index: true
    },
    purchase_datetime: {
        type: Date
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    }
})
const ticketModel = mongoose.model(ticketsCollection, ticketSchema)

module.exports = ticketModel 