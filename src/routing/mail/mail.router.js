const { Router } = require('express')
const router = Router()

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

router.get('/mail', isAuthorized, async (req, res) => {
    let result = await transport.sendMail({
        from: 'My Project <matibordenave@gmail.com>',
        to: 'matibordenave@gmail.com',
        subject: 'Correo de prueba',
        html: `
        <div>
            <h1> Coder App </h1>
        </div>
        `,
        attachments: []
    })
    res.send({ status: 'success', result: "Email sent" })
})

module.exports = router