
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

module.exports = router
