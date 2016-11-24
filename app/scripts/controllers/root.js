angular.module('chat').controller('RootController',function($scope, socket, $rootScope){
  socket.on('connect',function(e,data){
    console.log('connected');
  });
  var init = function(){
    setTimeout(function(){
      $rootScope.current_user = $scope.current_user;
    });
  };
  init();
})