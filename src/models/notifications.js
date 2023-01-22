const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const notificationSchema = new mongoose.Schema({
date: { 
    type: Date, 
    default:Date.now()},
  
sender:{ 
    type: Schema.Types.ObjectId,
    ref: "user",
    required:"provide corresponded Destinator."},

reciever:{ 
        type: Schema.Types.ObjectId,
        ref: "user",
        required:"provide corresponded reciever."},
content:{
    type:String
},
              
});


// notificationSchema.statics.create=async function(data)
// {
//     try{
//         notif=await this.create(data)
//         return notif;
//     }catch(err)
//     {throw err}
// }

// notificationSchema.statics.getNotifByPatient=async function(id){
//     try
//     { notifications= await this.find({reciever:id})
//       return notifications 
//     }
//     catch(err)
//     {
//       throw err
//     }
// }

module.exports = mongoose.model("Notification", notificationSchema);

