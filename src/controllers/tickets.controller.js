const { errorResponse, successResponse } = require("../utils/utils")
const TicketRepository = require("../models/repositories/tickets.repository")

const ticketRepository = new TicketRepository()

class TicketController {
    static getAllTickets = async (req, res, next) => {
        try {
            const tickets = await ticketRepository.getAllTickets()
            const response = successResponse(tickets)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static saveTicket = async (req, res, next) => {
        try {
            const payload = req.body
            const newTicket = await ticketRepository.saveTicket(payload)
            const response = successResponse(newTicket)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }
}

module.exports = TicketController