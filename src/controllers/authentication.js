const User= require('../models/user')
const {sendEmail}=require("../utils/sendmail")
const crypto=require('crypto')
const bcrypt= require('bcryptjs');


// send Token
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  console.log("user id :",user._id)
  res.status(statusCode).json({ success: true, token: token, user:user });
}


// register
exports.register= async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!(email && password && first_name && last_name)) {
        res.status(400).send({data:null,message:"All inputs are required"});
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send({data:null,message:"User Already Exist. Please Login"});
      }
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password
      });
        sendToken(user,201,res); 
    } catch (err) {
      console.log(err);
    }
  }





//   login
  exports.login= async (req, res) => {

    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send({data:null,message:"All input is required"});
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email }); 
      if (user)
     {  return bcrypt.compare(password, user.password).then((reponse)=>{
           if(reponse)
           {
            return sendToken(user,201,res)
           }
           res.status(500).json({data:null, message:"Invalid Credentials"})
           
         }).catch((err)=>{console.log(err)})
        
    }
      res.status(400).json({data:null, message:"Invalid Credentials"})
    } catch (err) {
      console.log(err);
    }
  }


// forgot password
  exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        await User.findOne({ email }).then(async (user) => {

            if (!user) {
                console.log("error1", user)
                return res.status(400).json({message:"email could not be send", data:null});
            
            }
            const resetToken = user.getResetPasswordToken();
            await user.save();
            const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
            const message = `<h1>You have requested a password reset</h1>
                    <p>Please go to this link to reset your password</p>
                    <a href=${resetUrl} clicktracking=off>${resetUrl}</>
                    `
            try {

                await sendEmail(
                    user.email,
                    "Password Reset Request",
                     message)
                return res.status(200).json({ success: true, message: "Email sent" })
            }
            catch (err) {
                user.getResetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save();
                console.log("error2")
                return res.status(400).json({message:"email could not be send , err : "+err, data:null});
              
            }
        })
    } catch (err) {
        next(err);
    }
}



// rest password
exports.ResetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    try {
        await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } }).then(async (user) => {
            if (!user) {
                return res.status(400).json({message:"Invalid Rest Token", data:null});
            }
            user.password = req.body.password;
            user.getResetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            res.status(200).json({
                success: true,
                data: "Password Reset Success "
            })
        })
    }
    catch (err) {
        next(err)
    }
}







