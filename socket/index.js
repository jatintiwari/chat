module.exports = function(io,models){
  var broadcast = io.of('/chat').on('connection',function(socket){
    console.log('Connected');
    socket.broadcast.emit('user:new');
  })
}