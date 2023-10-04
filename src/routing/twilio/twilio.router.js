const { Router } = require('express')
const router = Router()

const passport = require("passport")
const twilio = require('twilio')

const { passportCall, authorization } = require("../../utils/passport")
/* const { isAuthorized } = require("../middlewares/jwt.middleware")
 */

const TWILIO_ACCOUNT_SID = "ACd96f8a60fadeca35385b311e93ecb417"
const TWILIO_AUTH_TOKEN = "ecccbe7acc176f0f7a8be5e0699ee2b1"
const TWILIO_SMS_NUMBER = "+12512624095"

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

router.get('/mail', async (req, res) => {
})

module.exports = router 