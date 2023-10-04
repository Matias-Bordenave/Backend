class SaveCartDTO {
    constructor(payload) {
        this.name = payload.name
        this.products = payload.products
    }
}

module.exports = SaveCartDTO