
const { Router } = require("express")

const router = Router()

router.get("/", (req, res) => {
    res.send({ msg: "ok" })
})

router.get("/mockusers", (req, res) => {
    const { generateUser } = require("./mocks")

    const total = + req.query.total || 50
    const users = Array.from({ length: total }, () => generateUser)
    res.json({ success: true, payload: users })
})

router.get("/loggerTest", (req, res) => {
    req.logger.error("Test error")
    req.logger.warning("Test warning")
    req.logger.info("Test info")
    req.logger.debug("Test http")
    req.logger.fatal("Test Fatal")
})

module.exports = router