const SaveCartDTO = require("../dto/users.dto")

class UserRepository {
    constructor(usersDao) {
        this.dao = usersDao
    }

    getAll = async () => {
        return await this.dao.getAll()
    }

    save = async (payload) => {
        const userPayload = new SaveCartDTO(payload)
        return await this.dao.save(userPayload)
    }

    getById = async (id) => {
        return await this.dao.getById(id)
    }

    getByEmail = async (email) => {
        return await this.dao.getByEmail(email)
    }

    getCart = async (userId) => {
        return await this.dao.getCart(userId)
    }

    updateById = async (userId, user) => {
        return await this.dao.updateById(userId, user)
    }
}

module.exports = UserRepository