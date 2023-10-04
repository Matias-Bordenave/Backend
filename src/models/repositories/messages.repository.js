const { getDAOS } = require("../factories/messages.daos.factory")
const SaveMessageDTO = require("../dto/messages.dto")
const messagesDao = getDAOS()

class MessageRepository {
    constructor() {
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