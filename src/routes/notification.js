const router= require("express").Router()
const{create,getNotificationsByReciever} = require('../controllers/notification')
const {auth}=require("../middlewares/auth")

router.post("/create",create)
router.get('/getNotificationsByReciever/:id',getNotificationsByReciever)
module.exports=router;