const userModel = require('../../schema/users.schema')
const MongoManager = require("../../db/manager/mongo.manager")

class UsersMongoDao {
    constructor() {
        MongoManager.start()
    }

    getAll = async () => {
        return await userModel.find().lean()
    }

    getUserById = async (id) => {
        return await userModel.findOne({ id: parseInt(id) }).lean()
    }

    save = async (payload) => {
        const newUser = await userModel.create(payload)
        return newUser
    }

    getUserById = async (id) => {
        return await userModel.findOne({ _id: id }).lean()
    }

    getCart = async (userId) => {
        let user = await userModel.findOne({ _id: userId }).lean()
        return user.carts
    }

    setCart = async (userId, cartId) => {
        let user = await this.getUserById(userId)

        user.carts.push({ cart: cartId })

        await userModel.updateOne({ _id: userId }, user).then((res) => {

        }).catch((err) => {
            return err
        })

        return user
    }
}

module.exports = UsersMongoDao