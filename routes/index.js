module.exports = function(app, express, passport){
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
  })

  router.get('/chat',isAuthenticated,function(req, res, next){
    res.render('chat', { user: req.user });
  });
   app.use('/',router);
 }