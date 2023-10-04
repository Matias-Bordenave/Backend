const { Router } = require("express")

const MessageController = require("../../controllers/messages.controller")
const { authorization } = require("../../utils/passport")
const { isAuthorized } = require("../../middlewares/jwt.middleware")

const router = Router()

//Retorna todos los mensajes
router.get("/", isAuthorized, MessageController.getAllMessages)

//Crea un nuevo mensaje
router.post("/", isAuthorized, authorization("user"), MessageController.getAllMessages)


module.exports = router