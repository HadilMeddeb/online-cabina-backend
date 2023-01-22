const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const appointmentSchema = new mongoose.Schema({
date: { 
        type:Object,
        year: { type: String,
                 default: new Date().getFullYear(), },
        month:{
            type:Number,
            default:new Date().getMonth()},
        day:{
                type:Number,
                default:new Date().getDay()},
                 
        hour:{
              type:Number,
              default:new Date().getHours()},
        minutes:{type:Number,
                 default:new Date().getMinutes()},
    } ,
  
patient:{ 
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required:"provide corresponded patient."},

doctor:{ 
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required:"provide corresponded Doctor."},

        // pour verifier si le rendez vous a eu lieu ou pas 
status:{
    type:Boolean,
    default:false
},
associateDemand:
{
    type: Schema.Types.ObjectId,
    ref: "DemandeAppointment",
    required:"provide the corresponded demand."
}            
});
module.exports = mongoose.model("Appointment", appointmentSchema);
