angular.module('chat').controller('RootController',function($scope, socket){
  socket.on('connect',function(e,data){
    console.log('connected');
  });
})