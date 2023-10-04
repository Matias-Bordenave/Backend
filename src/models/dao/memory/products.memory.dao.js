class ProductsMemoryDao {
    constructor() {
        this.products = []
    }

    getAll = async () => {
        return await this.products
    }

    save = async (payload) => {
        const newProduct = ''
        return newProduct
    }

    getProductById = async (id) => {
        return await this.products.filter((item) => item.id == id)
    }
}

module.exports = ProductsMemoryDao