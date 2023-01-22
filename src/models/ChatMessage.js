const mongoose = require("mongoose")
const user= require("./user")
const ChatRoom= require('./ChatRoom')
const Schema= mongoose.Schema
const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserId:{
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new mongoose.Schema(
  {
    chatRoomId: {
        type: Schema.Types.ObjectId,
        ref: "ChatRoom",
    },
    message: String,
    postedByUser: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    collection: "chatmessages",
  }
);

chatMessageSchema.statics.createPostInChatRoom = async function (chatRoomId, message, postedByUser) {
  try {
    const post = await this.create({
      chatRoomId,
      message,
      postedByUser,
      readByRecipients: { readByUserId: postedByUser }
    });
    const findedPost=await this.findOne({_id:post._id}).populate('postedByUser')
    const chatRoom=await ChatRoom.findOneAndUpdate(
      {_id:chatRoomId},
      {$push:{messages:post._id}},
      {new:true})
    return findedPost
  } catch (error) {
    throw error;
  }
}



chatMessageSchema.statics.markMessageRead = async function (chatRoomId, currentUserOnlineId) {
    try {
      return this.updateMany(
        {
          chatRoomId,
          'readByRecipients.readByUserId': { $ne: currentUserOnlineId }
        },
        {
          $addToSet: {
            readByRecipients: { readByUserId: currentUserOnlineId }
          }
        },
        {
          multi: true
        }
      );
    } catch (error) {
      throw error;
    }
  }



chatMessageSchema.statics.getConversationByRoomId = async function (chatRoomId, options = {}) {
    try {
      conversation=await this.find({chatRoomId:chatRoomId}).populate("postedByUser")
      return conversation
    } catch (error) {
      throw error;
    }
  }

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
