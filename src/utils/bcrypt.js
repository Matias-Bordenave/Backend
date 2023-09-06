const bcrypt = require("bcrypt")

const createHash = (data) => {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(10))
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

module.exports = {
    createHash,
    isValidPassword
}   