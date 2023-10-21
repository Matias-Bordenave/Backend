class SaveProductDTO {
    constructor(payload) {
        this.title = payload.title
        this.description = payload.description
        this.price = payload.price
        this.thumbnail = payload.thumbnail
        this.code = payload.code
        this.stock = payload.stock
        this.status = true
        this.category = payload.category
        this.owner = payload.owner
    }
}

module.exports = SaveProductDTO