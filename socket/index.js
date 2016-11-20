module.exports = function(io,rooms){
  var broadcast = io.of('/greetings').on('connection',function(sock){
    console.log("Connected with the client ");
  })
}