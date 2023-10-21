const SaveTicketDTO = require("../dto/tickets.dto")

class TicketRepository {
    constructor(ticketsDao) {
        this.dao = ticketsDao
    }

    getAll = async () => {
        return await this.dao.getAll()
    }

    save = async (payload) => {
        const ticketPayload = new SaveTicketDTO(payload)
        return await this.dao.save(ticketPayload)
    }
}

module.exports = TicketRepository