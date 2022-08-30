const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");



const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = "jwt_secret_key";
// opts.issuer = "http://remote-server.com";
// opts.audience = "http://localhost:8080";


passport.use(
  new JwtStrategy(opts, function (jwtPayload, done) {
    const { sub, expiration } = jwtPayload;
    User.findOne({ _id: sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      
      if (!user) {
        return done(null, false);
      }

      if (Date.now() > expiration) {
        return done(null, false);
      }
      
      done(null, user);
    });

    
  })
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Invalid Email",
          });
        }
        user
          .comparePassword(password)
          .then((res) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(null, false, {
              message: "Invalid Password",
            });
          });
      });
    }
  )
);
