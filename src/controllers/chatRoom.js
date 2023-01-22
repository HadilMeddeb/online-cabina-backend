const ChatMessage= require('../models/ChatMessage')
const ChatRoom= require('../models/ChatRoom')

const user=require('../models/user')

exports.initiate= async (req, res) => {
  try {
    const { userIds, chatInitiator,patient,doctor } = req.body;
    const allUserIds = [...userIds, chatInitiator];
    const chatRoom = await ChatRoom.initiateChat(allUserIds,chatInitiator,patient,doctor);
    return res.status(200).json({ success: true, chatRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error: error })
  }
}


exports.postMessage=async (req, res) => {
  try {
    console.log("body body :",req.body)

    if (!req.body.message || !req.body.postedByUser)
    {return res.status(500).json({ success: false, error: "message text or user is not available" })}
    const { roomId } = req.params;
    
    const messageText= req.body.message
    
    const currentLoggedUser = req.body.postedByUser;
    const post = await ChatMessage.createPostInChatRoom(roomId, messageText, currentLoggedUser);
    global.io.sockets.in(roomId).emit('new message', { message: post });
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log("error :",error)
    return res.status(500).json({ success: false, error: error })
  }
}

exports.getConversationByRoomId=async (req, res) => {
  try {
    console.log("id :")
    const { roomId } = req.params;
    const room = await ChatRoom.getChatRoomByRoomId(roomId)
    console.log("room :",room)  
      if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      })
    }
    const users = await user.getUserByIds(room.userIds);
    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
    };
    const conversation = await ChatMessage.getConversationByRoomId(roomId, options);
    return res.status(200).json({
      success: true,
      conversation,
      users,
    });
  } catch (error) {
    console.log("error :",error)
    return res.status(500).json({ success: false, error });
  }
}

exports.getRoomsByUserId=async(req, res,next)=>{
  try
  {
    chatRooms=await ChatRoom.getRoomsByUserId(req.params.id)
    return res.status(200).json({
      success: true,
      chatRooms:chatRooms
    });
}catch(error)
{
  console.log("error :",error)
  return res.status(500).json({ success: false, error });
}
}



exports.verifyIfRoomExists=async(req,res,next)=>{
    ChatRoom.findOne({patient:req.body.patient,doctor:req.body.doctor}).then((room)=>{
        if(room)
        {
          res.status(200).json({
            success:true,
            data:{exist:true,chatRoom:room}
        })}
        else
        {
          res.status(200).json({
            success:true,
            data:{exist:false,chatRoom:null}
          })
        }}).catch((err)=>{
          return res.status(500).json({ success: false, error:err });
        })
}