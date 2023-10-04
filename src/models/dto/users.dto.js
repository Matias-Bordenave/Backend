class SaveUserDTO {
    constructor(payload) {
        this.name = payload.name
        this.email = payload.email
        this.password = payload.password
        this.age = payload.age
        this.rol = payload.rol
        this.cart = []
    }
}

module.exports = SaveUserDTO