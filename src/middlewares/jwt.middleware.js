const jwt = require("jsonwebtoken")


const isAuthorized = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.send('invalid token')
    }

    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'mysecretcoderjwt', (err, user) => {
        if (err) {
            return res.send("invalid token")
        }
        console.log("authorized")
        next()
    })
}

module.exports = { isAuthorized } 
