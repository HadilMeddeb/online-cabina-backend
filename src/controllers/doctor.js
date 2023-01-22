const Avis = require('../models/Avis');
const Doctor= require('../models/Doctor')
const User= require('../models/user')

// send Token
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  console.log("user id :",user._id)
  res.status(statusCode).json({ success: true, token: token, user:user });
}


exports.register= async (req, res) => {
    try {
      const { first_name, last_name, email, password,adressLocal,speciality,professionnal_career,tarif,tel } = req.body;
      if (!(email && password && first_name && last_name && adressLocal && speciality && professionnal_career && tarif && tel)) {
        res.status(400).send({data:null,message:"All inputs are required"});
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send({data:null,message:"User Already Exist. Please Login"});
      }
      // Create doctor in our database
      const doctor = await Doctor.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password,
        adressLocal,
        speciality,
        professionnal_career,
        tarif,
        tel 
      });
        sendToken(doctor,201,res); 
    } catch (err) {
      console.log(err);
    }
  }




  exports.getAll=(req,res,next)=>{
  Doctor.find({},(err,docs)=>{
    if(err)res.status(500).json({message:"error :"+err,data:null})
    else res.status(201).json({message:"success",data:docs})
  }).populate({path:"Avis",populate:{path:"pocessor"}})}

  exports.getDoctorById=(req,res,next)=>{
    Doctor.findById({_id:req.params.id}).populate({path:"Avis",populate:{path:"pocessor"}}).then((doctor)=>{
      if(doctor)
      {
        res.status(201).json({message:"success", data:doctor})
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


  //add avis to doctor
  exports.commenter=async(req,res,next)=>{
    Avis.create(req.body).then((doc)=>{
        Doctor.findOneAndUpdate({_id:req.params.id},{$push:{Avis:doc._id}},{new:true}).then(doctor=>{
          return res.status(200).json({message:"success",data:doctor})
      }).catch(err=>{
        return res.status(500).json({error:"error: "+err,data:null})
      })
  
    }).catch(err=>{
      return res.status(500).json({error:"error: "+err,data:null})
    })
    } 
// add patient to doctor
exports.addPatient=async(req,res,next)=>{
      Doctor.findOneAndUpdate({_id:req.params.id},{$push:{patients:req.body.id_patient}},{new:true}).then(doctor=>{
        console.log("patient added successfully doctor : ", doctor )

        return res.status(200).json({message:"success",data:doctor})
    }).catch(err=>{
      console.log("error adding patirnt  :", err)
      return res.status(500).json({error:"error: "+err,data:null})
    })
  } 


//update doctor profile
exports.updateDoctorProfile=async(req,res,next)=>{
      Doctor.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).then(doctor=>{
        return res.status(200).json({message:"success",data:doctor})
    }).catch(err=>{
      return res.status(500).json({error:"error: "+err,data:null})
    })
  }

//remove patient
exports.removePatient=async(req,res,next)=>{
  Doctor.findOneAndUpdate({_id:req.params.id},{$pull:{patients:req.body.patient}},{new:true}).then(doctor=>{
    return res.status(200).json({message:"success",data:doctor})
}).catch(err=>{
  return res.status(500).json({error:"error: "+err,data:null})
})
} 

//getDoctorPatients
exports.getDoctorPatients=(req,res,next)=>{
  Doctor.findById({_id:req.params.id}).populate("patients").then((doctor)=>{
    if(doctor.patients.length>0)
    {
      res.status(201).json({message:"success", data:doctor.patients})
    }
    else
    {
      res.status(201).json({message:"no data is there ", data:[]})
    }
  }).catch((err)=>{
    res.status(500).json({
      message:"error : "+ err,
      data:null,
   })
  })
}

exports.getFirstPatient=(req,res,next)=>{
Doctor.findById(req.params.id).populate("patients")
.then((doctor)=>{
  if(doctor.patients.length>0)
{  return res.status(201).json({message:"first patient successfully getted ! ",data:doctor.patients[0]})}
else {return res.status(400).json({error:"doctor has no patients ",data:null})}
})
.catch((err)=>{
  res.status(500).json({
    error:"error getting first patient: "+ err,
    data:null,
 })
})
}


