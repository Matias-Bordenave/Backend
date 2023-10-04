const messageModel = require('../../schema/messages.schema')
const MongoManager = require("../../db/manager/mongo.manager")

class MessagesMongoDao {
    constructor() {
        MongoManager.start()
    }

    getAll = async () => {
        return await messageModel.find().lean()
    }

    save = async (payload) => {
        const newMessage = await messageModel.create(payload)
        return newMessage
    }
}

module.exports = MessagesMongoDao
