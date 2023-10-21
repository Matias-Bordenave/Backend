const { Router } = require('express')
const router = Router()

const CONFIG = require("../../config/config")

const passport = require("passport")
const nodemailer = require('nodemailer')

const { passportCall, authorization } = require("../../utils/passport")
const { isAuthorized } = require("../../middlewares/jwt.middleware")


const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'matibordenave@gmail.com',
        pass: 'aijq eafu ukhv edxp'
    }
})

router.get('/restore-password', async (req, res) => {
    let result = await transport.sendMail({
        from: 'My Project <matibordenave@gmail.com>',
        to: 'matibordenave@gmail.com',
        subject: 'Restore Password',
        html: `
        <div>
            <h1> Restore Password </h1>
            <p>Podras reestablecer tu contraseña ingresando al link a continuacion </p>
            <a href="http://localhost:${CONFIG.PORT}/api/auth/restore-password"> Restore password </a>
        </div>
        `,
        attachments: []
    })
    res.send({ status: 'success', result: "Email sent" })
})

module.exports = router