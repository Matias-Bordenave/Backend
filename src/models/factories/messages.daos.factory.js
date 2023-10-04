const CONFIG = require("../../config/config")

let messagesDao

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

const getDAOS = () => {
    return (
        messagesDao
    )
}

module.exports = {
    getDAOS
}