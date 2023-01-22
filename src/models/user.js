const mongoose = require("mongoose");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto= require("crypto");
const { env } = require("process");

const userSchema = new mongoose.Schema({
  first_name: { type: String, 
                required:[true, "please provide your first name"]},

  last_name: { type: String,
                required:[true, "please provide your second name"]},
   image: { 
                type: String,
                default:""
          },
                  

  email:     {
                type:String,
                required:[true, "please provide an email"],
                unique:true,
                match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email"]
               },
              
   password: {
                type:String,
                required:[true, "please provide a password"],
                minlength:6,
                select:true,
               },
  
  resetPasswordToken: String,
  resetPasswordExpire:Date,

});



userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))
    {
        next()
    }
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
    next()
 })
 

 userSchema.methods.getUserName= async function(){
     return this.username;
 }
 

 userSchema.methods.matchPassword= async function(password){ 
  await bcrypt.compare(password, this.password,(err,res)=>{
      if (err){
        console.log("err :",err)
        return false
      }
      if (res){
        console.log("res :",res)
        return res
      } else {
        // response is OutgoingMessage object that server response http request
        return false
      }
    });
  };

 
 userSchema.methods.getSignedToken = function () 
 {
     
     return jwt.sign({ id: this._id , email:this.email}, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRE });
 };
 
 userSchema.methods.getResetPasswordToken= function(){
       const resetToken=crypto.randomBytes(20).toString("hex");
       this.resetPasswordToken=crypto.createHash("sha256")
                                     .update(resetToken)
                                     .digest("hex");
       this.resetPasswordExpire=Date.now()+10*(60*1000);
       console.log("reset token :",resetToken );
       console.log("reset expire :",this.resetPasswordExpire );
       return resetToken;
     }

     userSchema.statics.getUserById = async function (id) {
      try {
        const user = await this.findOne({ _id: id });
        if (!user) throw ({ error: 'No user with this id found' });
        return user;
      } catch (error) {
        throw error;
      }
    }
    userSchema.statics.getUserByIds = async function(ids)
    {
      try {
        console.log("ids :",ids)
        const users = await this.find({ _id: { $in: ids } });
        return users;
      } catch (error) {
        throw error;
      }
    }
    
module.exports = mongoose.model("user", userSchema);


