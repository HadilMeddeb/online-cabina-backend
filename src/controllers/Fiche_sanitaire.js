const FicheSanitaire= require('../models/Fiche_Sanitaire')
const Consultation= require('../models/Consultation')

//create
exports.create=(req,res,next)=>{
  FicheSanitaire.findOne({patient:req.body.patient,doctor:req.body.doctor}).populate('patient').populate('doctor').then((fiche)=>{
    if(fiche) res.status(201).json({message:"patient already have medical card ",data:fiche})
    else{
      FicheSanitaire.create(req.body).then((fiche)=>{ 
        console.log("consult :",fiche)
        res.status(201).json({message:"success",data:fiche})
}).catch((err)=>{
    console.log("error :",err)
    res.status(500).json({message:"failed",error:err})
})
    }
  }).catch((err)=>{
    res.status(500).json({error:"success",error:err})
  })

  
}


//getFicheByIdPatientAndDoctor
exports.getFicheByIdPatientAndDoctor=(req,res,next)=>{
  console.log("patient :" ,req.params.patientId)
  console.log("doctor :" ,req.params.doctorId)
  
    FicheSanitaire.findOne({patient:req.params.patientId,doctor:req.params.doctorId}).populate("patient").populate("doctor").populate("interviewsNotations").then((fiche)=>{
    if(fiche)
    {
      res.status(201).json({message:"success", data:fiche})
    }
    else
    {
      res.status(500).json({message:"no data is there ", data:null})
    }
  }).catch((err)=>{
    res.status(500).json({
      message:"error : "+ err,
      data:null,
   })
  })
}




//add consultation
exports.addConsultation=async(req,res,next)=>{
    Consultation.create(req.body).then((doc)=>{
        FicheSanitaire.findOneAndUpdate({_id:req.params.id},{$push:{interviewsNotations:doc._id}},{new:true}).populate("patient").populate("doctor").populate("interviewsNotations").then(fiche=>{
          return res.status(200).json({message:"success",data:fiche})
      }).catch(err=>{
        return res.status(500).json({message:"error: "+err.message,data:null})
      })
  
    }).catch(err=>{
      return res.status(500).json({message:"error: "+err.message,data:null})
    })
    } 
