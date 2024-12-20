const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const users = require('./routes/auth').users;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'ABC',
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const user = users.find((u) => u.username === jwt_payload.username);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
