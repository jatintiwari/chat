angular.module('chat').component('chatbox',{
  templateUrl: '/scripts/components/chatbox/template.html',
  bindings: {
    current_user: '<'
  },
  controller: function($scope, socket, $http, $rootScope){
    var self = this;
    var scrollBottomOfChatWindow = function(){
      setTimeout(function(){
        var doc = document.getElementsByClassName('chat-messages')[0];
        doc.scrollTop = doc.scrollHeight;
      })
    };

    socket.on('connect',function(e,data){
      e ? angular.noop() : init();
    },function(err){
      console.error("Some error in connecting, please refresh");
    });


    socket.on('message:new',function(message){
      $scope.messages.push(message);
      setTimeout(scrollBottomOfChatWindow,100);
    });

    socket.on('user:new',function(newUserId){
      self.getUsers(newUserId);
    });

    self.connected = function(){
      socket.emit('messages:my',self.current_user);
    };

    self.getChat = function(user){
      if(self.message.to == user.profileID)
        return;
      self.message.to = user.profileID;
      self.other_user = user;
      var doc = document.getElementsByClassName('chat-messages')[0];
      self.prGetChat = $http.get('/api/messages',{ params:{ self_user: self.current_user.profileID, other_user: user.profileID } });
      self.prGetChat.then(function(response){
        $scope.messages = response.data;
        setTimeout(scrollBottomOfChatWindow,100);
      });
    };

    self.getUsers = function(){
      self.prGetUsers = $http.get('/api/users');
      self.prGetUsers.then(function(response){
        $scope.users = response.data;
      });
    };

    self.enterMessage = function(e){
      if(e.which === 13){
        self.sendMessage();
      }
    };

    self.sendMessage = function(){
      if(self.message.text === null)
        return;
      self.message.date = new Date();
      socket.emit('message:send',self.message);
      var msg = angular.extend({},self.message);
      $scope.messages.push(msg);
      setTimeout(scrollBottomOfChatWindow,100);
      self.message.text = null;
    };

    var init = function(){
      self.current_user = $rootScope.current_user;
      self.message = {
        text: null,
        to: null,
        date: null,
        from: self.current_user.profileID
      };
      self.getUsers();
      self.connected();
    };
  }
})