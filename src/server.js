const express = require("express")
const path = require("path")
const handlebars = require('express-handlebars')
const CONFIG = require("./config/config")
const passport = require("passport")
const { initializePassport } = require("./config/passport/passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const cookieParser = require('cookie-parser')

const errMiddleware = require("./middlewares/errors.middleware")

const { PORT } = CONFIG

const app = express()

const appRouter = require("./routing/app.router")
app.use(express.json())
app.use(express.urlencoded({ express: true }))

app.use(session({
    store: MongoStore.create({
        mongoUrl: CONFIG.MONGO_URI
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}))

//public
app.use(express.static(path.resolve(__dirname, "../src/public")))

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser('coderSecret'))

//Views
app.engine('handlebars', handlebars.engine())
app.set('views', path.resolve(__dirname, "../src/views"))
app.set('view engine', 'handlebars')


app.use('/api', errMiddleware, appRouter)

app.listen(PORT, () => {
    console.log("Server UP  on port: ", PORT)
})