const { getDAOS } = require("../factories/tickets.daos.factory")
const SaveTicketDTO = require("../dto/tickets.dto")
const ticketsDao = getDAOS()

class TicketRepository {
    constructor() {
        this.dao = ticketsDao
    }

    getAllTickets = async () => {
        return await this.dao.getAll()
    }

    saveTicket = async (payload) => {
        const ticketPayload = new SaveTicketDTO(payload)
        return await this.dao.save(ticketPayload)
    }
}

module.exports = TicketRepository