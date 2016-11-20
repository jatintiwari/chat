var config = require('./config');
var modules = config.modules;
var app = config.app;

// using html views with hogan
app.set('views',modules.path.join(__dirname,'views'));
app.engine('html',modules.hogan);
app.set('view engine', 'html');
app.use(modules.express.static(modules.path.join(__dirname, 'public')));
app.use(session({
  secret: config.params.secret,
  resave: true,
  saveUninitialized: true,
  store: new config.modules.connectMongo({
    // url: config.params.db_url,
    mongoose_connection: modules.mongoose.connections[0],
    stringify: true
  })
}));
app.use(modules.passport.initialize());
app.use(modules.passport.session());

// init router after app session config
config.router.init();
app.listen(config.params.port,function(){
  console.info(config.params);
});

