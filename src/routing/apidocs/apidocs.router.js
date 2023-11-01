const { Router } = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUIExpress = require("swagger-ui-express")

const router = Router()

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Doc MyProject',
            description: "Projecto backend Coderhouse"
        },
        contact: {
            name: "soporte",
            url: 'https://www.example.com.ar',
            email: 'matibordenave@gmail.com'
        }
    },
    apis: [`${__dirname}/docs/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

router.get('/', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

module.exports = router;