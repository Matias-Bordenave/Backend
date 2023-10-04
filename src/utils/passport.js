const passport = require("passport")

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {

            if (err) return next(err)

            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}

const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.session) return res.status(401).send({ err: "Unauthorized" })
        if (req.session.rol != rol) return res.status(403).send({ err: "No permissions" })

        next()
    }
}

module.exports = { passportCall, authorization }