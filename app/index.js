angular.module('chat',[
  "btford.socket-io",
  "ui.router"
]).config(function($stateProvider, $locationProvider){
  $stateProvider.state({
    name: 'chat',
    url:'/chat',
    component:"mainframe",
  });
  $locationProvider.html5Mode(true);
})