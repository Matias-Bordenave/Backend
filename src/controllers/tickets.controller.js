const { errorResponse, successResponse } = require("../utils/utils")
const TicketService = require("../models/services/tickets.service")

const ticketService = new TicketService()

class TicketController {
    static getAll = async (req, res, next) => {
        try {
            const tickets = await ticketService.getAll()
            const response = successResponse(tickets)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }

    static save = async (req, res, next) => {
        try {
            const payload = req.body
            const newTicket = await ticketService.save(payload)
            const response = successResponse(newTicket)
            res.status(200).json(response)
        } catch (err) {
            req.logger.error(err)
            next(err)
        }
    }
}

module.exports = TicketController