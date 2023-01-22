const mongoose = require("mongoose");
const { stringify } = require("uuid");
const Schema= mongoose.Schema;

const ficheSanitaireSchema = new mongoose.Schema({
    created:{type:Date,default:Date.now()},
    patient:{ 
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required:"provide corresponded patient."},   
    doctor:{ 
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required:"provide corresponded Doctor."},
    interviewsNotations:[{ 
        type: Schema.Types.ObjectId,
        ref: "Consultation"},],
    illness_first_description:{
        type:String,
        required:"please provide illness first description "
    } 
    
});
module.exports = mongoose.model("FicheSanitaire", ficheSanitaireSchema);