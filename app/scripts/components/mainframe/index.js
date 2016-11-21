angular.module('chat').component('mainframe',{
  templateUrl: '/scripts/components/mainframe/template.html',
  controller: function($scope, socket){
    socket.on('connect',function(e,data){

    });
  }
})