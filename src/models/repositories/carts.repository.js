const { getDAOS } = require("../factories/carts.daos.factory")
const SaveCartDTO = require("../dto/carts.dto")
const cartsDao = getDAOS()

const ProductRepository = require("./products.repository")

const productRepository = new ProductRepository()

class CartRepository {
    constructor() {
        this.dao = cartsDao
    }

    getAllCarts = async () => {
        return await this.dao.getAll()
    }

    saveCart = async (payload) => {
        const cartPayload = new SaveCartDTO(payload)
        return await this.dao.save(cartPayload)
    }

    getCartById = async (id) => {
        return await this.dao.getCartById(id)
    }

    addProduct = async (cartId, productId, quantity) => {
        return await this.dao.addProduct(cartId, productId, quantity)
    }

    updateById = async (cartId, cart) => {
        return await this.dao.updateById(cartId, cart)
    }

    confirmPurchase = async (cartId) => {
        let cart = await this.dao.getCartById(cartId)

        let arr_sold = []
        let arr_not_sold = []


        await cart.products.forEach(async (product) => {
            let item = await productRepository.getProductById(product.product.toString())

            if (item.stock >= product.quantity) {

                console.log("product has been added to solded: " + product.product)
                arr_sold.push({ product: product.product, quantity: product.quantity })

                let new_stock = item.stock - parseInt(product.quantity)

                item.stock = new_stock

                //productRepository.updateById(product.product.toString(), item)
            } else {
                console.log("product has been added to not solded: " + product.product)
                arr_not_sold.push({ product: product.product, quantity: product.quantity })
            }

        });

        console.log(arr_sold)
        console.log(arr_not_sold)

        //return arr_sold
    }
}

module.exports = CartRepository