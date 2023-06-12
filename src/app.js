

const express = require('express')

const app = express()
const PORT = 3000

const productsRouter = require('../routers/products.router.js')
const cartRouter = require('../routers/carts.router.js')

/* MULTER */
//const filesRouter = require('../routers/files.router.js')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use(productsRouter)
app.use(cartRouter)

/* MULTER */
//app.use(filesRouter)

app.listen(PORT, (req,res) => {
    console.log("Server running on  port ",PORT)
})
