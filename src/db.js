const mongoose = require("mongoose")

const DB_NAME = "ecommerce"
const URL = "mongodb+srv://matibordenave:bordenavepass@codercluster.tb0mecc.mongodb.net/" + DB_NAME

module.exports = {
    connect: () => {
        return mongoose.connect(URL, {}).then((connection) => {
            console.log("App connected to Database Successfully")
        }).catch((err) => {
            console.log(err)
        })
    }
} 