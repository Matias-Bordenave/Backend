class SaveMessageDTO {
    constructor(payload) {
        this.user = payload.user
        this.message = payload.message
        this.date = new Date().toLocaleString()
    }
}

module.exports = SaveMessageDTO