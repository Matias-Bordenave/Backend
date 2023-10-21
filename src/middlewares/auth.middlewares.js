const applyPolicy = (roles) => {
    return (req, res, next) => {
        if (roles[0].toUpperCase == "PUBLIC") return next()

        if (!req.user) return res.status(401).send({ status: "error", error: "No autenticado" })
    }
}

module.exports = {
    applyPolicy
}