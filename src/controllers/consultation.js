const Consultation= require('../models/Consultation')

exports.create=(req,res,next)=>{
    Consultation.create(req.body).then((consult)=>{ 
            console.log("consult :",consult)
            res.status(201).json({message:"success",data:consult})
    }).catch((err)=>{
        console.log("error :",err)
        res.status(201).json({message:"failed",error:err})
    })
}

