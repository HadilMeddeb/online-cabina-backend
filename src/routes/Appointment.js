const router= require("express").Router()
const{create,getByAssociatedDemand,getAppointmentsByPatient,getAll,getAppointmentsByDoctor} = require('../controllers/appointment')
const {auth}=require("../middlewares/auth")

router.post("/create",create)
router.get("/getByAssociatedDemand/:id",getByAssociatedDemand)
router.get("/getAppointmentsByPatient/:id",getAppointmentsByPatient)
router.get("/getAppointmentsByDoctor/:id",getAppointmentsByDoctor)
router.get("/getAll",getAll)

module.exports=router;