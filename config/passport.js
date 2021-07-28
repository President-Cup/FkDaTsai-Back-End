const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const userDb = require("../db/user");
// import models from "../models";

// const Users = models.User;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
// jwtOptions.issuer = 'accounts.examplesoft.com';
// jwtOptions.audience = 'yoursite.net';

let strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  // console.log("payload received", jwt_payload);
  let user = await userDb.findUserById(jwt_payload.userid);

  // if (err) {
  //   return done(err, false);
  // }

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use(strategy);

module.exports = { jwtOptions };
