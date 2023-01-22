const mongoose = require("mongoose")
const Schema= mongoose.Schema
const chatRoomSchema = new mongoose.Schema(
  {
    userIds: [{
        type: Schema.Types.ObjectId,
        ref: "user",
    }],
    patient:{
      type: Schema.Types.ObjectId,
      ref: "Patient",
  },
  doctor:{
    type: Schema.Types.ObjectId,
    ref: "Doctor",
   },
    image:String,
    roomName:String,
    chatInitiator: {type: Schema.Types.ObjectId,
        ref: "user"},
    messages:[
        {type: Schema.Types.ObjectId,
         ref: "ChatMessage"}]
  },
  {
    timestamps: true,
    collection: "chatrooms",
  }
);

chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
        console.log("roooomid :", roomId)
      const room = await this.findOne({ _id: roomId });
      console.log("room 11:",room)
      return room;
    } catch (error) {
      throw error;
    }
  }


chatRoomSchema.statics.initiateChat =
 async function ( userIds,chatInitiator,patient,doctor) 
 {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      }

    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
      };
    }

    const newRoom = await this.create({ userIds, chatInitiator ,patient,doctor});
    console.log("new room :",newRoom)
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}


chatRoomSchema.statics.getRoomsByUserId = async function(id)
{
  try{
    const rooms= await this.find({userIds:{$all:[id]}}).sort({'updatedAt':1}).populate("userIds").populate("doctor").populate("patient")
    return rooms 
  }catch(error){
    throw error
  }

}

module.exports = mongoose.model("ChatRoom", chatRoomSchema);