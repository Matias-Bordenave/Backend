const cartModel = require('../dao/models/carts.model')

const { getProductDBIdService } = require('./products.service')

const getCartByIdService = async (id) => {

    let data = await cartModel.find({ id: id })
        .then((res) => {
            return res[0]
        })
        .catch((err) => {
            return err
        })

    return data
}

const addProductToCartService = async (cartId, productId, quantity) => {

    let cart = await getCartByIdService(cartId)

    let pr_id = await getProductDBIdService(productId)

    console.log(pr_id)

    cart.products.push({ product: pr_id, quantity: parseInt(quantity) })


    await cartModel.updateOne({ id: cartId }, cart).then((res) => {
        console.log(res)
        return true
    }).catch((err) => {
        console.log(err)
        return false
    })
}

const deleteProductFromCartService = (cartId, productId) => {

    let pr_id = getProductDBIdService(productId)

    let cart = getCartByIdService(cartId)

    let c_products = cart.products.filter((product) => { product._id.toString() != pr_id })

    cart.products = c_products

    cartModel.updateOne({ id: parseInt(req.params.cid) }, cart).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

const getCartsService = async () => {

    let data = await cartModel.find({})
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    return data
}

const createCartService = () => {

}

module.exports = {
    getCartByIdService,
    addProductToCartService,
    deleteProductFromCartService,
    getCartsService,
    createCartService
}