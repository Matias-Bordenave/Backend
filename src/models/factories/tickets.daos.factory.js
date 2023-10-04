const CONFIG = require("../../config/config")

let ticketsDao

switch (CONFIG.DATASOURCE) {
    case "MEMORY": {
        const TicketsMemoryDao = require("../dao/memory/tickets.memory.dao")
        ticketsDao = new TicketsMemoryDao()
        break
    }
    case "MONGO": {
        const TicketsMongoDao = require("../dao/mongo/tickets.mongo.dao")
        ticketsDao = new TicketsMongoDao()
        break
    }
    default:
        throw new Error("Param not found")
}

const getDAOS = () => {
    return (
        ticketsDao
    )
}

module.exports = {
    getDAOS
}