const { errorResponse, successResponse } = require("../utils/utils")
const MessageRepository = require("../models/repositories/messages.repository")

const messageRepository = new MessageRepository()

class MessageController {
    static getAllMessages = async (req, res, next) => {
        try {
            const messages = await messageRepository.getAllMessages()
            const response = successResponse(messages)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }

    static saveMessage = async (req, res, next) => {
        const payload = req.body
        try {

            const newMessage = await messageRepository.saveMessage(payload)

            const response = successResponse(newMessage)
            res.status(200).json(response)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MessageController
