const express = require("express")
const path = require("path")
const handlebars = require('express-handlebars')
const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")
const cookieParser = require('cookie-parser')

const CONFIG = require("./config/config")
const { initializePassport } = require("./config/passport/passport")
const addLogger = require("./utils/logger")
const errMiddleware = require("./middlewares/errors.middleware")


const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUIExpress = require("swagger-ui-express")

const cluster = require('cluster')
const { cpus } = require("os")

if (cluster.isPrimary) {
    for (let i = 1; i <= cpus().length; i++) {
        cluster.fork()
    }
} else {
    const app = express()
    const appRouter = require("./routing/app.router")
    app.use(express.json())
    app.use(express.urlencoded({ express: true }))

    app.use(session({
        store: MongoStore.create({
            mongoUrl: CONFIG.mongo.URI
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

    app.use(addLogger)
    app.use('/api', errMiddleware, appRouter)

    const swaggerOptions = {
        definition: {
            openapi: '3.0.1',
            info: {
                title: 'Doc MyProject',
                description: "Projecto backend Coderhouse"
                ,
                contact: {
                    name: "soporte",
                    url: 'https://www.example.com.ar',
                    email: 'matibordenave@gmail.com'
                }
            }
        },
        apis: [`${__dirname}/docs/**/*.yaml`]
    }

    const specs = swaggerJSDoc(swaggerOptions)

    app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))





    app.listen(CONFIG.PORT, () => {
        console.log("Server UP  on port: ", CONFIG.PORT)
    })

}