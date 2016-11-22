angular.module('chat').component('chatbox',{
  templateUrl: '/scripts/components/chatbox/template.html',
  controller: function($scope, socket, $http){
    var self = this;
    socket.on('connect',function(e,data){
      init();
    });

    self.getCurrentUser = function(){
      $http.get('/api/user').then(function(response){
        $scope.user = response.data;
      });
    };

    socket.on('user:new',function(e){
      console.log('new users');
      self.getUsers();
    });

    self.getChat = function(user){
      self.activeChatId = user.profileID;
    };

    self.getUsers = function(){
      $http.get('/api/users').then(function(response){
        $scope.users = response.data;
      });
    };
    var init = function(){
      self.getUsers();
      self.getCurrentUser();
    };
  }
})