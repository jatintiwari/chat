angular.module('chat').factory('socket',function(socketFactory){
  var myIoSocket = io.connect('/chat');
  return socketFactory({ioSocket: myIoSocket});
});