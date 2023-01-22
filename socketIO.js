const { Socket } = require("socket.io");
exports.socketIO = class 
{
    Constructor(httpServer)
    { 
    console.log("heyyyyyyyy")
    this.io=Server(httpServer);
    this.io.on('connection', (socket) => {
        console.log("***************************************************************************************************")
        console.log('a user has connected');
        socket.on("join server", (userId)=>{
            const user={userId,socketId:socket.id}
            console.log("***************************************************************************************************")
            this.users.push(user);
        })
        socket.on("join room",(roomName,cb)=>{
            socket.join(roomName)
            cb(this.messages[roomName])
        })

        socket.on("send message",({content,to,sender})=>{
            payload={
                content,
                chatName:sender,
                sender
            }
            socket.to(to).emit("send message",payload)
            if(this.messages[sender])
            {
                this.messages[sender].push({
                    sender,
                    content
                })
            }
        })
        socket.on("disconnect",()=>{
           users=users.filter(u=>u.socketId!==socket.id)
        })
        


      });
      
    this.users=[];
    messages=[]
    }

    init() {
        // doub me luser iloguini bech nconnectiwoh beserveur bech fin me nemettiw ey event youslou direc
        //nejmou nesta3mloha ba3d fil les notifs 
     
    }

    joinRoom (roomId){
        io.socketsJoin(roomId);
    }
    leaveRoom (roomId){
        io.socketsLeave(roomId);
    }
   
}