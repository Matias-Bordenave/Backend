const jwt = require("jsonwebtoken")


const isAuthorized = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log("invalid token")
        return res.send('invalid token')
    }

    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, 'mysecretcoderjwt', (err, user) => {
        if (err) {
            console.log("invalid token")
            return res.send("invalid token")
        }
        next()
    })
}

module.exports = { isAuthorized }