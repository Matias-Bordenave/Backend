const { errorResponse, successResponse } = require("../utils/utils")
const MessageService = require("../models/services/messages.service")

const messageService = new MessageService()

class MessageController {
    static getAllMessages = async (req, res, next) => {
        try {
            const messages = await messageService.getAllMessages()
            const response = successResponse(messages)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static saveMessage = async (req, res, next) => {
        const payload = req.body
        try {

            const newMessage = await messageService.saveMessage(payload)

            const response = successResponse(newMessage)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MessageController