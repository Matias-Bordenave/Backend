
const express = require('express')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const db = require('./db.js')
const cookieParser = require('cookie-parser')

const productsRouter = require('./routers/products.router.js')
const cartRouter = require('./routers/carts.router.js')
const homeRouter = require('./routers/home.router.js')
const chatRouter = require('./routers/chat.router.js')
const loginRouter = require('./routers/login.router.js')

//esto no va aca
const { Router } = require('express')
const router = Router()

// Express and port
const app = express()
const PORT = process.env.PORT || 3001

//Http Server 
const server = http.createServer(app)

//Socket
const io = new Server(server)


//public
app.use(express.static(path.resolve(__dirname, "../src/public")))


//Views
app.engine('handlebars', handlebars.engine())
app.set('views', path.resolve(__dirname, "../src/views"))
app.set('view engine', 'handlebars')

/* MULTER */
//const filesRouter = require('../routers/files.router.js')

//Middlewares
app.use(cookieParser('coderSecret'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use(productsRouter)
app.use(cartRouter)
app.use(homeRouter)
app.use(chatRouter)
app.use(loginRouter)

/* MULTER */
//app.use(filesRouter)

//Web socket actions
let messages = []
prod_flag = false

io.on('connection', (socket) => {

    const ProductManager = require('./dao/fileSystem/ProductManager.js')
    const prManager = new ProductManager("../products.json")


    const productModel = require("./dao/models/products.model.js")

    //Request Products
    socket.on("req-products", (data) => {
        productModel.find()
        .then((products) => {
            socket.emit("res-products", { products: products })
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    //Cancel New Product
    socket.on("np-cancel", (data) => {
        io.emit("clear-np-screen", {})
        productModel.find()
        .then((products) => {
            socket.emit("res-products", { products: products })
        })
        .catch((err)=>{
            console.log(err)
        })
        
    })

    //Add a New Product
    socket.on("add-product", (data) => {
        //prManager.addProduct(data)
        console.log(data)
        let newprod = prManager.getProductByCode(data.code)
        console.log(newprod)
        //productModel.create(newprod)

        socket.emit("clear-np-screen", {})
        productModel.find()
        .then((products) => {
            io.sockets.emit("res-products", { products: products })
        })
        .catch((err)=>{
            console.log(err)
        })
        
    })

    socket.on("new-message", (data) => {

        const messageModel = require("./dao/models/message.model.js")

        messages.push(data)
        messageModel.create({ user: data.author, message: data.text, date: new Date() })
        io.sockets.emit("message-all", messages)
    })
})

db.connect()

server.listen(PORT, (req, res) => {
    console.log("Server running on  port ", PORT)
})