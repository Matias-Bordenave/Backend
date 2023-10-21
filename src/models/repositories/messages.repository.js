const SaveMessageDTO = require("../dto/messages.dto")

class MessageRepository {
    constructor(messagesDao) {
        this.dao = messagesDao
    }

    getAllMessages = async () => {
        return await this.dao.getAll()
    }

    saveMessage = async (payload) => {
        const messagePayload = new SaveMessageDTO(payload)
        return await this.dao.save(messagePayload)
    }
}

module.exports = MessageRepository