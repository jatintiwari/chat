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
    res.render('chat', { params: params, user: req.user });
  });

  router.get('/api/users',isAuthenticated,function(req, res, next){
    this.User = models.User;
    this.User.find({}, function(err, users) {
      users = users.filter(function(user){ return user._id != req.user._id });
      res.json(users);
    });
  });

  app.use('/',router);
 }