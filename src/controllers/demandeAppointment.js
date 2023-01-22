const req = require('express/lib/request')
const DemandeAppointment= require('../models/DemandeAppointment')
const Appointment=require('../models/Appointment')
const Notification=require('../models/notifications')
const FicheSanitaire=require('../models/Fiche_Sanitaire')
const Doctor=require('../models/Doctor')
const res = require('express/lib/response')


exports.create=async (req,res,next)=>{
demandes= await DemandeAppointment.find( {$and:[{patient:req.body.patient},{doctor:req.body.doctor},{"date.year":req.body.date.year}, {"date.month":req.body.date.month},{"date.day":req.body.date.day}]})

    if(demandes.length>0) return res.status(500).json({message:"you have already made a demande today"})
  
    DemandeAppointment.create(req.body).then((demande,error)=>{
        console.log(req.body)

        
          if(demande)
          {
              return res.status(201).json({message:"Demande sent successfully",data:demande})
          }
          if(error)
          {
              return res.status(500).json({message:"error Demande has not been sent ",error:error})
          }
         next()
      }).catch((err)=>{
          res.status(500).json({message:"failed ",error:err})
      })
}


// by Doctor
exports.getAppointmentDemandes=(req,res,next)=>{

    DemandeAppointment.find({status:req.body.status,doctor:req.body.doctor}).populate('doctor').populate('patient').then((demandes)=>{
        if(demandes.length>0)
        {
            res.status(201).json({message:"success",data:demandes})
        }
        else
        {
            res.status(201).json({message:"no data find",data:[]})
        }

    }).catch((err)=>{
        res.status(500).json({message:"failed",error:err})
    })
}

exports.deleteDemande=(req,res,next)=>{
    DemandeAppointment.deleteOne({_id:req.params.id}).then((demande)=>{
        if(demande)
        {
            console.log("Demande",demande)
            res.status(201).json({message:"deleted successfully",data:demande})
        }
    }).catch((err)=>{
        console.log("error",err)
        res.status(500).json({message:"failed",error:err})
    })
}

exports.updateDemandStatus=(req,res,next)=>{
    DemandeAppointment.findByIdAndUpdate({_id:req.body.id},{status:true},{upsert: true},(err,doc)=>{
         if(doc)
        {
            return res.status(201).json({message:"updated successfully ! ", data:doc})
        }
        else 
        {
            return res.status(500).json({message:"error"+err,data:null})
        }    
    })
}

exports.DemandAppointmentByPatientID=(req,res,next)=>{

    DemandeAppointment.findOne({patient:req.params._id}).then((demande)=>{
        if(demandes.length>0)
        {
            res.status(201).json({message:"success",data:demandes})
        }
        else
        {
            res.status(201).json({message:"no data find",data:[]})
        }

    }).catch((err)=>{
        res.status(500).json({message:"failed",error:err})
    })
}


exports.validateDemande=(req,res,next)=>{
    // verify date validation
    console.log("req.body  :",req.body )
 date= new Date()
 date2=new Date(req.body.date.year,req.body.date.month-1,req.body.date.day,req.body.date.hour,req.body.date.minutes)
 console.log("date2 :",date2.toDateString())
 if(date2<date)
 {return res.status(400).json({message:"invalid date or time ",data:null})}
 
   // find if there is any similar demande at the same time 
 Appointment.find({$and:[{"date.month":req.body.date.month},
                               {"date.year":req.body.date.year},
                               {"date.day":req.body.date.day},
                               {"date.hour":req.body.date.hour},
                              ]})
             .then(appos=>{
                 if(appos.length>0)
                   {console.log("appos :",appos)
                    return res.status(400).json({message:"cannot generate an appointment in this date  time is already  reserved",data:null})
                   }           
                           })
            .catch((err)=>{
                res.status(500).json({message:"failed finding appointments :"+err.message})})

  //get Demand Appointment and update  
DemandeAppointment.findById(req.params.id).populate("doctor").populate("patient")
            .then((demand)=>{
                     if(demand)
                           {if (demand.status==false){
                                 demand.status=true
                                 demand.save()
                                Appointment.create(
                                            {
                                             date:demand.date,
                                             patient:demand.patient,
                                             doctor:demand.doctor,
                                             status:false,
                                             associateDemand:demand._id
                                            })
                                                                        .then(appoin=>{
                                                                                         Notification.create({
                                                                                         reciever:demand.patient._id,
                                                                                         sender:demand.doctor._id,
                                                                                         content:"your demand to get an appointment with Mr  "+demand.doctor.first_name+" "
                                                                                         +demand.doctor.last_name+"has been accepted  you will have a session with him in "
                                                                                         +"date : "+req.body.date.day+"/"+req.body.date.month+"/"+req.body.date.year+"/n"
                                                                                         +"time : "+req.body.date.hour+"/"+req.body.date.minutes+"/n try to be at time "})
                                                                                         .then(notif=>{

                                                                                                     Doctor.findOneAndUpdate({_id:demand.doctor._id},{$push:{patients:demand.patient._id}},{new:true}).then(doctor=>{
                                                                                                                   console.log("patient added successfully doctor : ", doctor )
                                                                                                                   FicheSanitaire.create(
                                                                                                                    {  patient:demand.patient,
                                                                                                                       doctor:demand.doctor,
                                                                                                                       illness_first_description:demand.maladieDetails,})
                                                                                                                    .then(fiche=>{
                                                                                                                                res.status(201).json({message:"fiche sanitaire created successfully",data:fiche})})
                                                                                                                    .catch((err)=>{
                                                                                                                                  res.status(500).json({message:"failed fiche"+err.message,data:null})}) 
                                                                                                            }).catch(err=>{
                                                                                                                   console.log("error adding patirnt  :", err)
                                                                                                                   return res.status(500).json({error:"error: "+err,data:null})
                                                                                                                   })                   
                                                                                         })
                                                                                        .catch((err)=>{
                                                                                                res.status(500).json({message:"failed notif :"+err.message})})
                                                                                     })
                                                                                     .catch((err)=>{
                                                                                             res.status(500).json({message:"failed appointment "+err.message})})
                                                     }
                                                     else {res.status(400).json({message:"demand already validated ",data:null})}
                             }
                             else {return res.status(201).json({message:"no data demand find with this id ",data:null})}})
             .catch((err)=>{
                     res.status(500).json({message:"failed :"+err.message})}) 
                 


}

