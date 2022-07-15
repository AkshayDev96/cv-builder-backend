const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')
const userAuth = require('../middlewares/middleware')
const upload = require('../middlewares/fileUploader')

route.post("/change_layout",userAuth,userController.changeLayout)
route.post("/uploadFile",upload.single("profile"),userController.uploadFile)
route.post("/updateCv",userAuth,userController.updateCv)
route.get("/userInfo",userAuth,userController.getUserInfo)


module.exports = route