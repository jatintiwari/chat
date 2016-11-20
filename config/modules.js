var modules = function(){
  var params = require('./params')[(process.env.NODE_ENV || "development")];
  this.express = require('express');
  this.path = require('path');
  this.http = require('http');
  this.socketio = require('socket.io');
  this.hogan = require('hogan-express');
  this.session = require('express-session');
  this.connectMongo =  require('connect-mongo')(this.session);
  this.mongoose = require('mongoose').connect(params.db_url);
  this.passport = require('passport');
  this.FacebookStrategy = require('passport-facebook').Strategy;
  return this;
}
module.exports = modules();