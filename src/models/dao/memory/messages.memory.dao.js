class MessagesMemoryDao {
    constructor() {
        this.messages = []
    }

    getAll = async () => {
        return await this.messages
    }

    save = async (payload) => {
        const newMessages = ''
        return newMessages
    }
}

module.exports = MessagesMemoryDao