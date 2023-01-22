const mongoose = require("mongoose")
const Schema= mongoose.Schema;
const avisSchema = new mongoose.Schema({
    created:{type:Date,default:Date.now()},
    pocessor:{ 
        type: Schema.Types.ObjectId,
        ref: "user",
        required:"provide corresponded patient."},
    text:{
        type:String,
        required:"provide corresponded text"
        }
    
});
module.exports = mongoose.model("Avis", avisSchema);