class TicketsMemoryDao {
    constructor() {
        this.tickets = []
    }

    getAll = async () => {
        return await this.tickets
    }

    save = async (payload) => {
        const newTicket = ''
        return newTicket
    }

    getTicketById = async (id) => {
        return await this.tickets.filter((item) => item.id == id)
    }
}

module.exports = TicketsMemoryDao