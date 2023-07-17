const { Router } = require('express')

const router = Router()

router.get('/api/home',(req,res) => {
    res.render('home', {})
})


module.exports = router