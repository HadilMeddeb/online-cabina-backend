const Appointment= require('../models/Appointment')
const DemandeAppointment = require('../models/DemandeAppointment')

exports.create=async (req,res,next)=>{
    demandes= await Appointment.find( {$and:[{"date.year":req.body.date.year}, {"date.month":req.body.date.month},{"date.day":req.body.date.day},{"date.hour":req.body.date.hour},{"date.minutes":{ $gte:0, $lte: 59 }}]})
    if(demandes.length>0) return res.status(500).json({message:"this time is already reserved choose an other time !"})
    Appointment.create(req.body).then((appointment)=>{
        if(appointment)
        {
            DemandeAppointment.findByIdAndUpdate({_id:req.body.associateDemand},{$set:{status:true}},{new:true},(err,doc)=>{
                if(err)
                {
                  return res.status(500).json({message:"error :"+err,data:null})
                }
                console.log("demande :",appointment)
            res.status(201).json({message:"success",data:{appointment:appointment,demand:doc}})
            })}
    }).catch((err)=>{
        console.log("error :",err)
        res.status(500).json({message:"failed",error:err})
    })}


// get Appointment By its associated Demand
exports.getByAssociatedDemand=(req,res,next)=>{
    Appointment.find({associateDemand:req.params.id},(err,doc)=>{
        if(err)res.status(500).json({message:"error :"+err,data:null})
        else res.status(201).json({message:"success",data:doc})
})}


// All Appointments of the patient 
exports.getAppointmentsByPatient=(req,res,next)=>{
    Appointment.find({patient:req.params.id}).populate("doctor").then((appointment)=>{
     res.status(201).json({message:"success",data:appointment})}
    ).catch((err)=>{
        res.status(500).json({message:"error :"+err,data:null})
})}

// All Appointments of the doctor 
exports.getAppointmentsByDoctor=(req,res,next)=>{
    Appointment.find({doctor:req.params.id}).populate("patient").then((appointment)=>{
     res.status(201).json({message:"success",data:appointment})}
    ).catch((err)=>{
        res.status(500).json({message:"error :"+err,data:null})
})}



// getAll
exports.getAll=(req,res,next)=>{
    Appointment.find({}).then((appointment)=>{
     res.status(201).json({message:"success",data:appointment})}
    ).catch((err)=>{
        res.status(500).json({message:"error :"+err,data:null})
})}






