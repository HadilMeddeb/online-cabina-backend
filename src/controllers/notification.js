const Notification= require('../models/notifications')

exports.create=(req,res,next)=>{
Notification.create(req.body).then((notif)=>{
        if(notif)
        {
            console.log("notif :",notif)
            res.status(201).json({message:"success",data:notif})
        }

    }).catch((err)=>{
        console.log("error :",err)
        res.status(201).json({message:"failed",error:err})
    })
}

exports.getNotificationsByReciever=(req,res,next)=>{
Notification.find({reciever:req.params.id})
.populate("reciever")
.populate("sender")
.then((docs)=>{
 res.status(201).json({message:"success",data:docs})
})
.catch(err=>{res.status(500).json({error:"error getting notifs : "+err, data:null})})
}
