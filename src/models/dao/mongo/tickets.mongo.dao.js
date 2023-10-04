const ticketModel = require('../../schema/tickets.schema')
const MongoManager = require("../../db/manager/mongo.manager")

class TicketsMongoDao {
    constructor() {
        MongoManager.start()
    }

    getAll = async () => {
        return await ticketModel.find().lean()
    }

    save = async (payload) => {
        const newTicket = await ticketModel.create(payload)
        return newTicket
    }
}

module.exports = TicketsMongoDao