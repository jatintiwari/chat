module.exports = function(io,models){
  var broadcast = io.of('/chat').on('connection',function(socket){
    socket.broadcast.emit('user:new');
    // fetch messages
    socket.on('messages:my',function(data){
      socket.join(data.profileID,function(){
        socket.userProfileID = data.profileID;
      });
    });

    // send a message
    socket.on('message:send',function(message){
      console.log(message);
      var msg = new models.Message({to: message.to, from: message.from, date: new Date(),text: message.text });
      msg.save(function(err){
        console.log('sending message to '+message.to+' from '+message.from);
        socket.to(message.to).emit('message:new',message);
      });
    })
  });
}