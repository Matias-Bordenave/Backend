const { getDAOS } = require("../factories/users.daos.factory")
const SaveCartDTO = require("../dto/users.dto")
const usersDao = getDAOS()

class UserRepository {
    constructor() {
        this.dao = usersDao
    }

    getAllUsers = async () => {
        return await this.dao.getAll()
    }

    saveUser = async (payload) => {
        const userPayload = new SaveCartDTO(payload)
        return await this.dao.save(userPayload)
    }

    getUserById = async (id) => {
        return await this.dao.getUserById(id)
    }

    getCart = async (userId) => {
        return await this.dao.getCart(userId)
    }

    addCart = async (userId, cartId) => {
        return await this.dao.setCart(userId, cartId)
    }
}

module.exports = UserRepository