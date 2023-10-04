class UsersMemoryDao {
    constructor() {
        this.users = []
    }

    getAll = async () => {
        return await this.users
    }

    save = async (payload) => {
        const newUser = ''
        return newUser
    }
}

module.exports = UsersMemoryDao
