const Patient= require('../models/Patient')



// send Token
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    console.log("user id :",user._id)
    res.status(statusCode).json({ success: true, token: token, user:user });
  }

  
// register
exports.register= async (req, res) => {
    try {
      const { first_name, last_name, email, password,cin,phone,birthday,adress,marital_status} = req.body;
      if (!(email || password || first_name || last_name || cin||phone||birthday||adress||marital_status)) {
        res.status(400).send({data:null,message:"All inputs are required"});
      }
      const oldPatient = await Patient.findOne({ email });
      if (oldPatient) {
        return res.status(409).send({data:null,message:"Patient Already Exist. Please Login"});
      }
      // Create patient in our database     
      date =new Date(birthday)                                                            
      const patient = await Patient.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password,
        cin,
        phone,
        birthday:{year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()},
        adress,
        marital_status
      });      
        sendToken(patient,201,res); 
    } catch (err) {
      console.log(err);
    }
  }


// update Patient
exports.updatePatientProfile=async(req,res,next)=>{
  
  date =new Date(birthday)  
  const newpatient = {
    first_name,
    last_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password,
    cin,
    phone,
    birthday:{year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()},
    adress,
    marital_status
  };  

  Patient.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).then(doctor=>{
    return res.status(200).json({message:"success",data:doctor})
}).catch(err=>{
  return res.status(500).json({error:"error: "+err,data:null})
})
}


// getPatient by Id
exports.getPatientById=(req,res,next)=>{
  Patient.findById({_id:req.params.id}).then((patient)=>{
    if(patient)
    {
      res.status(201).json({message:"success", data:patient})
    }
    else{
      res.status(500).json({message:"no data is there ", data:null})
    }
  }).catch((err)=>{
    res.status(500).json({
      message:"error : "+ err,
      data:null,
   })
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
