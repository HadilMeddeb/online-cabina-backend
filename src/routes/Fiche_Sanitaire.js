const router= require("express").Router()
const {create,addConsultation,getFicheByIdPatientAndDoctor}=require("../controllers/Fiche_sanitaire")

router.post("/create",create)
router.get("/getFicheByIdPatientAndDoctor/:patientId/:doctorId",getFicheByIdPatientAndDoctor)
router.put("/addConsultation/:id",addConsultation)



addConsultation
module.exports=router;