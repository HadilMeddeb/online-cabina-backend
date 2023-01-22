const res = require("express/lib/response");
const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const demandeAppointmentSchema = new mongoose.Schema({
date: { 
        type:Object,
        year: { type: String,
                 default: new Date().getFullYear(), },
        month:{
            type:Number,
            default:new Date().getMonth()},
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
status:{
    type:Boolean,
    default:false
},
  etat:{
      type:String,
      required:"please provide etat du malade"
  },
  maladieDetails:{
    type:String,
    required:"please provide des details de la maladie"
},
raisonChoix:{
    type:String,
    required:"please provide les raisons du choix du docteur"
}, 
debutDatesDisponible:{type:Date,
        required:"please provide la date de debut de votre disponibilité"},

finDatesDisponible:{type:Date,
        required:"please provide la date de fin de votre disponibilité"},
                   
});

module.exports = mongoose.model("DemandeAppointment", demandeAppointmentSchema);