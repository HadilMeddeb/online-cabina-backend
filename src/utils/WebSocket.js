

  exports.connection=(client)=>{
      users = [];
      // event fired when the chat room is disconnected
      client.on("disconnect", () => {
       users = users.filter((user) => user.socketId !== client.id);
      });
      
      client.on("subscribe", (room) => {
        console.log("join: " + room);
        socket.join(room);
      });

      // mute a chat room
      client.on("quit", (room) => {
        client.leave(room);
      });
      // get message
      client.on('message', ({message, room}, callback) => {
        console.log("message: " + message + " in " + room);
      
        // generate data to send to receivers
        const outgoingMessage = {
          name: socket.user.name,
          id: socket.user.id,
          message,
        };
        // send socket to all in room except sender
        socket.to(room).emit("message", outgoingMessage);
        callback({
          status: "ok"
        });
      });


    }
  

  
  
