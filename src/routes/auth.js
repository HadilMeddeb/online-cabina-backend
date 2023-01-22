const router= require("express").Router()
const { register,login,forgotPassword,ResetPassword }= require("../controllers/authentication")


router.post("/login",login)
router.post("/register",register)
router.post("/forgotPassword",forgotPassword)
router.post("/ResetPassword/:resetToken",ResetPassword)

module.exports=router;