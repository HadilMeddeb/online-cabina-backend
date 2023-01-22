const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const ConsultationSchema = new mongoose.Schema({
   date:{
       type:Date,
       default:Date.now()
    },
   remarqs:
   {
       type:String
   }
              
});

module.exports = mongoose.model("Consultation", ConsultationSchema);