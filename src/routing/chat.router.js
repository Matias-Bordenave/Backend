const { Router } = require('express')
const router = Router()



router.get('/chat', (req, res) => {
    res.render('chat', { style: "style.css" })
})

module.exports = router;