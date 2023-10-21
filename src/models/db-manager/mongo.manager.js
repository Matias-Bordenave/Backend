const mongoose = require("mongoose")

const CONFIG = require("../../../config/config")

class MongoManager {

    static #instance

    constructor() {
        mongoose.connect(CONFIG.mongo.URI).then(
            () => {
                console.log("DB connected")
            }).catch((err) => {
                console.log("Error connecting DB")
                throw err
            })
    }

    static start() {
        if (!this.#instance) {
            this.#instance = new MongoManager()
        }
        return this.#instance
    }
}

module.exports = MongoManager