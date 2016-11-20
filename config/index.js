var config = function{
  var _this = this;
  this.modules = require('./modules');
  this.params = require('./params')[(process.env.NODE_ENV || "development")];
  this.app = this.modules.express();
  this.router = { init: function(){ require('../routes')(_this.app, _this.modules.express, _this.modules.passport)} };
  var models = require('../models')(this.modules);
  var passp0rt = require('../auth')(_this.modules.passport, _this.modules.FacebookStrategy, _this.params, models.User);
  return this;
};
module.exports = config;