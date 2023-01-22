const http = require("http");
const cors = require("cors")
const express= require('express')
// const session=require("express-session")
require("dotenv").config()
const {connectDB}= require('./src/configs/database')
// const{Socket}= require('socket.io')
const port = process.env.PORT ||  process.env.API_PORT;
const app=express()
const server = http.createServer(app);
connectDB()

app.use(express.json())
app.use(cors())
//app.use(session({secret:'my secret',resave:false,save:false}))
const users=[];

// io=new Socket(server);
// io.on('connection', (socket) => {
//     console.log('a user has connected');
    // socket.on("join server", (userId)=>{
    //     const user={userId,socketId:socket.id}
    //     users.push(user);
    //     io.emit("new user",users)
    // })
    // socket.on("join-room",({userId,roomId},cb)=>{
    // if (error) {
    //   cb(error);
    // } else {
    //   socket.join(roomId)
    //   socket.to(roomId).broadcast.emit('room-conversation', userId,{messages:["message1","message2"]})
    //   }
    // })

    // socket.on("send message",({content,to,sender})=>{
    //     payload={
    //         content,
    //         chatName:sender,
    //         sender
    //     }
    //     socket.to(to).emit("send message",payload)
    //     if(this.messages[sender])
    //     {
    //         this.messages[sender].push({
    //             sender,
    //             content
    //         })
    //     }
    // })
    // socket.on("disconnect",()=>{
    //    users=users.filter(u=>u.socketId!==socket.id)
    // })
  // });
  


                        



app.use("/api/auth",require('./src/routes/auth'));  
app.use("/api/doctor",require('./src/routes/doctor'));  
app.use("/api/patient",require('./src/routes/patient'));  
app.use("/api/demandeAppointment",require('./src/routes/DemandeAppointment'));  
app.use("/api/notification",require('./src/routes/notification'));  
app.use("/api/appointment",require('./src/routes/Appointment'));  
app.use("/api/user",require('./src/routes/User'));  
app.use("/api/ficheSanitaire",require('./src/routes/Fiche_Sanitaire'));  
app.use("/api/chat",(require('./src/routes/chat')));  
    





// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
