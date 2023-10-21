const CONFIG = require("../../config/config")
const UserRepository = require("../repositories/users.repository")

let usersDao

class UserService {
    constructor() {
        switch (CONFIG.DATASOURCE) {
            case "MEMORY": {
                const UsersMemoryDao = require("../dao/memory/users.memory.dao")
                usersDao = new UsersMemoryDao()
                break
            }
            case "MONGO": {
                const UsersMongoDao = require("../dao/mongo/users.mongo.dao")
                usersDao = new UsersMongoDao()
                break
            }
            default:
                throw new Error("Param not found")
        }

        return new UserRepository(usersDao)
    }
}

module.exports = UserService