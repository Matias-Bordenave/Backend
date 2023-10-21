const CONFIG = require("../../config/config")
const MessageRepository = require("../repositories/messages.repository")

let messagesDao

class MessageService {
    constructor() {
        switch (CONFIG.DATASOURCE) {
            case "MEMORY": {
                const MessagesMemoryDao = require("../dao/memory/messages.memory.dao")
                messagesDao = new MessagesMemoryDao()
                break
            }
            case "MONGO": {
                const MessagesMongoDao = require("../dao/mongo/messages.mongo.dao")
                messagesDao = new MessagesMongoDao()
                break
            }
            default:
                throw new Error("Param not found")
        }

        return new MessageRepository(messagesDao)
    }
}

module.exports = MessageService