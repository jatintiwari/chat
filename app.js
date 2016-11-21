var modules = require('./config/modules');
var params = require('./config/params')[process.env.NODE_ENV || "development"];
var app = modules.express();
var models = require('./models')(modules);
var passport = require('./auth')(modules.passport, modules.FacebookStrategy, params, models.User);
var rooms = [];
// using html views with hogan
app.set('views',modules.path.join(__dirname,'app/views'));
app.engine('html',modules.hogan);
app.set('view engine', 'html');
app.use(modules.express.static(modules.path.join(__dirname, 'public')));
app.use(modules.express.static(modules.path.join(__dirname, 'app')));
app.use(modules.express.static(modules.path.join(__dirname, 'bower_components')));
app.use(session({
  secret: params.secret,
  resave: true,
  saveUninitialized: true,
  store: new modules.connectMongo({
    // url: config.params.db_url,
    mongoose_connection: modules.mongoose.connections[0],
    stringify: true
  })
}));
app.use(modules.passport.initialize());
app.use(modules.passport.session());

// init router after app session config
require('./routes')(app, modules.express, modules.passport, params, path)
// app.listen(config.params.port,function(){
//   console.info(config.params);
// });

var server =  modules.http.createServer(app);
var io = modules.socketio.listen(server);
require('./socket')(io,rooms);
server.listen(params.port,function(){
  console.info(params, __dirname, app.get('env'));
});
