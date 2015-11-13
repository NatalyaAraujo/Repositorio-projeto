var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('app/models/usuario');

// Use the LocalStrategy within Passport.

passport.use(new LocalStrategy(
{
  usernameField: 'login',
  passwordField: 'senha'
},
  function(login, senha, done) {
    Usuario.findOne({ login: login }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.senha != senha) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Usuario.findById(id, function(err, user) {
    done(err, user);
  });
});