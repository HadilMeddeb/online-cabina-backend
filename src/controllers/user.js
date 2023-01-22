const User= require('../models/user')

  exports.updateProfilePicture=async (req,res,next)=>{
    console.log("************************************************")
    console.log(req.file)
    User.findByIdAndUpdate(
      req.params.id,
      {$set:{image:req.file.filename}},
      {new:true},
      (err,user)=>{ 
      if(err)
      {
        res.status(500).json({
         message:"user not updated"+ err,
         data:null,
      })
      }
      else if(user)
      {
        res.status(200).json({
         message:"user updated successfully",
         data:user,
     })}
     else
     {  res.status(200).json({
        message:"user not found",
        data:user,
     }) }}
  )}