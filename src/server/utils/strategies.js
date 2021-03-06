const passport = require('passport');
const LocalStrategy = require('passport-local');
const schema = require('./schema.js');
const User = schema.User;


passport.use(new LocalStrategy(
  function (usernameOrEmail, password, done) {
    User.findOne({$or:[{email: usernameOrEmail},{username: usernameOrEmail}]}, {username: 1, email: 1, password: 1}, (err, user) => {
      console.log("User " + usernameOrEmail + " attempted to log in.");
      if (err) { return done(err); }
      if (!user) {  return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      console.log("User " + usernameOrEmail + " logged in.");
      return done(null, user);
    });
  }
));

module.exports = passport;