module.exports = function(app, express, passport, params, models){
  var router = express.Router();

  router.get('/',function(req,res,next){
    if(!req.isAuthenticated()){ res.render('index') }else{ res.redirect('/chat') };
  });
  var isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){ return next() }else{ res.redirect('/') };
  }
  router.get('/auth/facebook', passport.authenticate('facebook'));
  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',passport.authenticate('facebook', {
    successRedirect : '/chat',
    failureRedirect : '/'
  }));

  router.get('/logout',function(req, res, next){
    req.logout();
    res.redirect('/');
  });

  router.get('/config',function(req, res, next){
    res.json(req.user);
  });

  router.get('/chat',isAuthenticated,function(req, res, next){
    res.render('chat', { params: params, user: JSON.stringify(req.user) });
  });

  router.get('/api/users',isAuthenticated,function(req, res){
    models.User.find({}, function(err, users) {
      u = users.filter(function(user){ return user.profileID != req.user.profileID });
      res.json(u);
    });
  });

  router.get('/api/messages',isAuthenticated,function(req, res){
    console.log("messages from "+req.query.self_user+" to "+req.query.other_user+" and viceversa!");
    models.Message.find().or([
      { $and: [{ from: req.query.self_user, to: req.query.other_user }]},
      { $and: [{ to: req.query.self_user, from: req.query.other_user }]}
      ]).exec(function(err,messages){
      res.json(messages);
    })
  });

  router.get('/api/user',isAuthenticated,function(req, res){
    res.json(req.user);
  });

  app.use('/',router);
}