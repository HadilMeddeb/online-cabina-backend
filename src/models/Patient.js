const mongoose = require("mongoose")
const User= require('./user')

const patientSchema = new mongoose.Schema({
    role:{type:String,default:"Patient"},
    cin:{type:Number,required:"please provide your cin"},
    phone:{type:Number,required:"please provide your phone number"},
    birthday:{
        type:Object,
        required:"please provide your birthday",
        year:{type:Number},
        month:{type:Number},
        day:{type:Number},
    },
    adress:{type:String,required:"please provide your adress"},
    marital_status:{type:String,required:"please provide your marital status"},
});
module.exports = User.discriminator("Patient", patientSchema);