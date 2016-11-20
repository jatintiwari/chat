module.exports = function(passport, FacebookStrategy, params, User){
  // serialize
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err,user);
    })
  });
  passport.use(new FacebookStrategy({
    clientID: params.fb.app_id,
    clientSecret: params.fb.app_secret,
    callbackURL: params.fb.callbackUrl,
    profileFields: ["id","displayName","photos"]
  },function(accessToken, refreshToken, profile, done){
    User.findOne({profileID: profile.id}, function(err, result){
      if(err,result){
        // found
        done(null,result)
      }else{
        // not found, create one
        console.log(profile);
        var newUser = new User({profileID: profile.id, fullname: profile.displayName, profilePic: profile.photos[0].value || ""});
        newUser.save(function(err){
          done(null,newUser)
        });
      }
    })
  }))
};