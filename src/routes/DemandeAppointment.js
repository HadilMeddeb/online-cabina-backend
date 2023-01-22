const router= require("express").Router()
const{create,getAppointmentDemandes,validateDemande,deleteDemande,updateDemandStatus} = require('../controllers/demandeAppointment')
const {auth}=require("../middlewares/auth")

router.post("/create",create)
router.post("/getAppointmentDemandes",getAppointmentDemandes)
router.delete("/deleteDemande/:id",deleteDemande)
router.put("/update/:id",updateDemandStatus)
router.put("/update/:id",updateDemandStatus)
router.put("/validateDemand/:id",validateDemande)
module.exports=router;