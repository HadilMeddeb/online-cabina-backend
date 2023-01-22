const router= require("express").Router()
const {register,updateDoctorProfile,getFirstPatient,getDoctorPatients,commenter,getAll,getDoctorById,addPatient,removePatient}=require("../controllers/doctor")

router.post("/register",register)
router.get('/getAll',getAll)
router.get('/getDoctorById/:id',getDoctorById)
router.put('/commenter/:id',commenter)
router.put('/updateDoctorProfile/:id',updateDoctorProfile)
router.put('/addPatient/:id',addPatient)
router.delete('/removePatient/:id',removePatient)
router.get('/getDoctorPatients/:id',getDoctorPatients)
router.get('/getFirstPatient/:id',getFirstPatient)

module.exports=router;