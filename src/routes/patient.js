const router= require("express").Router()
const { register,updatePatientProfile,getPatientById}= require("../controllers/patient")

router.post("/register",register)
router.put("/updatePatientProfile",updatePatientProfile)
router.get("/getPatientById/:id",getPatientById)

module.exports=router;