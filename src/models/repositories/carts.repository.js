const SaveCartDTO = require("../dto/carts.dto")

class CartRepository {
    constructor(cartsDao) {
        this.dao = cartsDao
    }

    getAll = async () => {
        return await this.dao.getAll()
    }

    save = async (payload) => {
        const cartPayload = new SaveCartDTO(payload)
        return await this.dao.save(cartPayload)
    }

    getById = async (id) => {
        return await this.dao.getById(id)
    }

    updateById = async (cartId, cart) => {
        return await this.dao.updateById(cartId, cart)
    }

    deleteById = async (cartId) => {
        return await this.dao.deleteById(cartId)
    }
}

module.exports = CartRepository