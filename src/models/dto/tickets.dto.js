class SaveTicketDTO {
    constructor(payload) {
        this.code = payload.code
        this.purchase_datetime = new Date().toLocaleString()
        this.amount = payload.amount
        this.purchaser = payload.purchaser
    }
}

module.exports = SaveTicketDTO