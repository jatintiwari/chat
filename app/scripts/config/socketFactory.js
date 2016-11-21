angular.module('chat').factory('socket',function(socketFactory){
  var myIoSocket = io.connect('/greetings');
  return socketFactory({ioSocket: myIoSocket});
});