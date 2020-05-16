const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require('../controllers/userController')

passport.use('local-signin', new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback : true
    },
    function(req, email, password, done) {
      userController.localAuth(email, password)
      .then(function (user) {
        if (user) {
          console.log("LOGGED IN AS: " + user.email);
          req.session.success = 'You are successfully logged in ' + user.email + '!';
          done(null, user);
        }
        if (!user) {
          console.log("COULD NOT LOG IN");
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          done(null, user);
        }
      })
      .fail(function (err){
        console.log(err.body);
      });
    }
  ));
  
  // Use the LocalStrategy within Passport to Register/"signup" users.
  passport.use('local-signup', new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback : true
    },
  //allows us to pass back the request to the callback
    function(req, email, password, done) {
      userController.localReg(email, password)
      .then(function (user) {
        if (user) {
          console.log("REGISTERED: " + user.email);
          done(null, user);
        }
        if (!user) {
          console.log("COULD NOT REGISTER");
          done(null, user);
        }
      })
      .fail(function (err){
        console.log(err.body);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log("serializing " + user.email);
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + JSON.stringify(obj));
    done(null, obj);
  });

  module.exports = passport;