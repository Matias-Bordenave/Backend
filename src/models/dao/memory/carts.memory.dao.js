class CartsMemoryDao {
    constructor() {
        this.carts = []
    }

    getAll = async () => {
        return await this.carts
    }

    save = async (payload) => {
        const newCart = ''
        return newCart
    }
}

module.exports = CartsMemoryDao