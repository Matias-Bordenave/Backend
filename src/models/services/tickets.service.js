const CONFIG = require("../../config/config")
const TicketRepository = require("../repositories/tickets.repository")

let ticketsDao

class TicketService {
    constructor() {
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

        return new TicketRepository(ticketsDao)
    }
}

module.exports = TicketService