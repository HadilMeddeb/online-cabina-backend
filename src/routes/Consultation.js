const router= require("express").Router()
const {create}=require("../controllers/consultation")

router.post("/create",create)

module.exports=router;