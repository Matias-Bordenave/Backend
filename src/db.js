const mongoose = require("mongoose")

const DB_NAME = "ecommerce"
const URL = "mongodb+srv://ianbifano:ecommercepass@ecommerce-cluster.bzmyj9n.mongodb.net/" + DB_NAME

module.exports = {
    connect : () => {
        return mongoose.connect(URL, {}).then((connection)=>{
            console.log("App connected to Database Successfully")
        }).catch((err)=>{
            console.log(err)
        })
    }
} 