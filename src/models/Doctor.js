const mongoose = require("mongoose")
const User= require('./user')
const Schema= mongoose.Schema;
const doctorSchema = new mongoose.Schema({
    role:{type:String,default:"Doctor"},
    adressLocal:{type:String,required:"please provide the adress of your local"},
    speciality : {type:String,required:"speciality is required"},
    professionnal_career :{type:String,required:"professional journey is required"},
    patients:[{
        type: Schema.Types.ObjectId,
        ref: "Patient",
    }],
    chatRooms:[{
        type: Schema.Types.ObjectId,
        ref: "ChatRoom",
    }],
    rates:[{type:Number,default:0,
        min: [0, 'Too few '],
        max: [5, 'Too much'],
          }],
    Avis:[{
        type: Schema.Types.ObjectId,
        ref: "Avis",
    }],
    tarif: {type:Number, required:"please provide your tarif"},
    tel: {type:Number, required:"please provide your phone number"}
});

module.exports = User.discriminator("Doctor",doctorSchema);