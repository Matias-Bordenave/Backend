
//Dependencies
const express = require('express')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const MongoStore = require("connect-mongo")
const passport = require("passport")
const { initializePassport } = require("./config/passport/passport")

//DB config
const db = require('./db.js')

//Routers
const productsRouter = require('./routers/products.router.js')
const cartRouter = require('./routers/carts.router.js')
const homeRouter = require('./routers/home.router.js')
const chatRouter = require('./routers/chat.router.js')
const loginRouter = require('./routers/auth.router.js')

// Express and port
const app = express()
const PORT = process.env.PORT || 3000

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

//Cookies
app.use(cookieParser('coderSecret'))

//Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://matibordenave:bordenavepass@codercluster.tb0mecc.mongodb.net/" + DB_NAME
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

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
            .catch((err) => {
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
            .catch((err) => {
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
            .catch((err) => {
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