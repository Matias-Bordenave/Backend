const { Router } = require('express')
const router = Router()

const TicketController = require("../../controllers/tickets.controller")

const { isAuthorized } = require("../../middlewares/jwt.middleware")

const { authorization } = require("../../utils/passport")
//Retorna todos los cart
router.get('/', isAuthorized, TicketController.getAllTickets)
router.post('/', isAuthorized, TicketController.saveTicket)

module.exports = router;